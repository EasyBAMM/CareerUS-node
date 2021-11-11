import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

// 글 작성 sanitize 옵션
const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'b',
    'i',
    'u',
    's',
    'em',
    'strong',
    'span',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
    'pre'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src', 'width', 'align'],
    li: ['class'],
    '*': ['style'],
  },
  allowedStyles: {
    '*': {
      // Match HEX and RGB
      color: [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      'background-color': [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      'text-align': [/^left$/, /^right$/, /^center$/],
      // Match any number with px, em, or %
      'font-size': [/^\d+(?:px|em|%)$/],
    },
  },
  allowedSchemes: ['data', 'http', 'https'],
};

// 특정 포스트(id) - read, delete, update 미들웨어
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id).exec();
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    // 조회수 +1
    // 쿠키 "post._id": "ip"
    const checkViews = ctx.cookies.get(String(post._id));
    if (!checkViews) {
      const addr =
        ctx.headers['x-forwarded-for'] ||
        ctx.connection.remoteAddress ||
        ctx.socket.remoteAddress ||
        ctx.connection.socket.remoteAddress ||
        null;
      if (addr) {
        ctx.cookies.set(post._id, addr, {
          maxAge: 1000 * 60 * 10 * 1, // 10 분
          httpOnly: true,
        });
        post.views++; // 조회수 +1
        await post.save();
      }
    }

    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 글 수정, 삭제 권한 미들웨어
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/* 포스트 작성
POST /api/posts
{ 
    title: '제목',
    body: '내용',
    tags: ['태그1', '태그2'] 
}
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required()가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  // const { _id, username, name } = ctx.state.user;
  // const post = new Post({
  //   title,
  //   body: sanitizeHtml(body, sanitizeOption),
  //   tags,
  //   username: username,
  //   _id: _id,
  // });
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 목록 조회
GET /api/posts?username=&tag=&page=
*/
// fucntion: html을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

// function: 포스트 목록 검색
const createSearchQuery = (queries) => {
  // tag, username, search, keyword로 검색
  const { tag, username, search, keyword } = queries;
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const searchQuery = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  // 검색조건, 검색명으로 쿼리문 조건 설정
  if (search && keyword && keyword.length >= 2) {
    const postQueries = [];
    if (search === 'all') {
      // 전체
      postQueries.push({ title: { $regex: new RegExp(keyword, 'i') } });
      postQueries.push({ body: { $regex: new RegExp(keyword, 'i') } });
      postQueries.push({
        'user.name': { $regex: new RegExp(keyword, 'i') },
      });
    }
    if (search === 'title') {
      // 제목
      postQueries.push({ title: { $regex: new RegExp(keyword, 'i') } });
    }
    if (search === 'body') {
      // 내용
      postQueries.push({ body: { $regex: new RegExp(keyword, 'i') } });
    }
    if (search === 'name') {
      // 작성자
      postQueries.push({
        'user.name': { $regex: new RegExp(keyword, 'i') },
      });
    }

    if (postQueries.length > 0) {
      searchQuery['$or'] = postQueries;
    }
  }

  return searchQuery;
};

export const list = async (ctx) => {
  // 페이징 처리
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1, 15 을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);
  const limit = parseInt(ctx.query.limit || '15', 10);
  const skip = (page - 1) * limit; // 무시할 게시물의 수
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  // 검색 쿼리 처리
  const query = createSearchQuery(ctx.query);

  try {
    // 기존 게시글만 가져오는 코드
    // const posts = await Post.find(query)
    //   .sort({ _id: -1 })
    //   .limit(limit)
    //   .skip(skip)
    //   .lean()
    //   .exec();

    // 게시글 + 댓글 수 집합해서 가져오기
    const posts = await Post.aggregate([
      { $match: query },
      { $sort: { _id: -1 } },
      { $limit: skip + limit },
      { $skip: skip },
      {
        $lookup: {
          from: 'comments',
          let: { post_id: '$_id' },
          pipeline: [
            {
              $match: {
                isDeleted: { $eq: false },
                $expr: { $eq: ['$post', '$$post_id'] },
              },
            },
            { $project: { _id: 0 } },
          ],
          as: 'comments',
        },
      },
      {
        $addFields: {
          comments: { $size: '$comments' },
        },
      },
    ]).exec();

    const postCount = await Post.countDocuments(query).exec(); // 전체 게시물 수
    // 게시글, 현재 페이지, 한 번에 보여지는 수, 전체 게시글 수
    ctx.body = {
      posts: posts,
      currentPage: page,
      limit: limit,
      count: postCount,
    };
    // ctx.set('Last-Page', Math.ceil(Math.ceil(postCount / limit));
    // ctx.body = posts.map((post) => ({
    //   ...post,
    //   body: removeHtmlAndShorten(post.body),
    // }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = (ctx) => {
  ctx.body = ctx.state.post;
};

/* 포스트 수정
PATCH /api/posts/:id
{ 
    title: '수정',
    body: '수정 내용',
    tags: ['수정', '태그']
}
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  // write에서 사용한 schema와 비슷한데, required()가 없습니다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  // body 값이 주어졌으면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false일 때는 업데이트되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};
