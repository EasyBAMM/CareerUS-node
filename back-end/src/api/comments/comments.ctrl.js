import Comment from '../../models/comment';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import Post from '../../models/post';

const { ObjectId } = mongoose.Types;

// 특정 포스트(id) - 존재 유무 미들웨어
export const checkPostId = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 댓글 수정, 삭제 권한 미들웨어
export const checkOwnComment = async (ctx, next) => {
  const { commentId } = ctx.request.body;
  if (!ObjectId.isValid(commentId)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const comment = await Comment.findById(commentId);
    // 댓글이 존재하지 않을 때
    if (!comment) {
      ctx.status = 404; // Not Found
      return;
    }
    const { user } = ctx.state;
    if (comment.author.toString() !== user._id) {
      ctx.status = 403;
      return;
    }
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 댓글 작성
POST /api/comments/:id
{
    toComment: 'username(없을수있음)',
    text: '댓글생성',
    parentComment: '부모댓글아이디(없을수있음)',
}
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    parentComment: Joi.string(),
    toComment: Joi.string(),
    text: Joi.string().required().required(),
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  // console.log('댓글생성 요청정보: ', ctx.request.body);

  // 부모댓글이 있다면 대댓글, 없다면 댓글
  const { toComment, parentComment, text } = ctx.request.body;
  if (parentComment) {
    try {
      // 1. 부모 댓글 정보가져오기
      const parentCommentData = await Comment.findById(parentComment)
        .lean()
        .exec();

      // 2. 부모 댓글의 그룹번호를 물려받기, 그룹정렬은 + 1 (깊이는 사실 필요없음 2단계까지만 표시)
      const depth = parentCommentData.depth + 1;
      const groupno = parentCommentData.groupno;
      const groupord = 1;
      const inputComment = {
        author: ctx.state.user._id,
        post: ctx.state.post._id,
        parentComment,
        depth,
        groupno,
        groupord,
        toComment,
        text,
      };
      // 댓글 생성
      const saveComment = await Comment.create(inputComment);
      const comment = await Comment.find({ _id: saveComment._id })
        .populate({ path: 'author', select: ['username', 'image'] })
        .lean()
        .exec();
      ctx.body = comment;
      // console.log('대댓글 생성됨: ', ctx.body);
    } catch (e) {
      // 대댓글 생성 실패
      ctx.throw(500, e);
      console.log('err: ', e);
    }
  } // 대댓글
  else {
    try {
      // 댓글 생성 - 나머지 default 설정됨
      const inputComment = {
        author: ctx.state.user._id,
        post: ctx.state.post._id,
        text: text,
      };
      const saveComment = await Comment.create(inputComment);
      const comment = await Comment.find({ _id: saveComment._id })
        .populate({ path: 'author', select: ['username', 'image'] })
        .lean()
        .exec();

      ctx.body = comment;
      // console.log('댓글 생성됨: ', ctx.body);
    } catch (e) {
      // 댓글 생성 실패
      ctx.throw(500, e);
      console.log('err: ', e);
    }
  } // 댓글
};

/* 댓글 읽기
GET /api/comments?id=6146a56f4b93055f4c64e506&page=1&orderBy=asc
*/
export const read = async (ctx) => {
  const { id } = ctx.query;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  // 댓글 페이징 처리
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1, 50 을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);
  const limit = parseInt(ctx.query.limit || '50', 10);
  let orderBy = 1;
  if (ctx.query.orderBy === 'asc') {
    orderBy = 1;
  } else if (ctx.query.orderBy === 'desc') {
    orderBy = -1;
  }
  const skip = (page - 1) * limit; // 무시할 댓글의 수
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  // 댓글 쿼리 처리 - 정렬중요(그룹번호로 먼저 출력, 같으면 입력날짜)
  const query = { post: id, isDeleted: false };
  // .populate({path: 'author', select: 'username'})
  try {
    const comments = await Comment.find(query)
      .sort({ groupno: orderBy, groupord: 1, createdAt: orderBy })
      .limit(limit)
      .skip(skip)
      .populate({ path: 'author', select: ['username', 'image'] })
      .lean()
      .exec();

    const commentCount = await Comment.countDocuments(query).exec(); // 전체 댓글 수
    // 댓글, 현재 페이지, 한 번에 보여지는 수, 전체 댓글 수
    ctx.body = {
      comments: comments,
      currentPage: page,
      limit: limit,
      count: commentCount,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 댓글 수정
PATCH /api/comments/:id
{
    commentId: '댓글ObjectId',
    text: '수정 내용',
    toComment: '부모댓글(없을수있음)',
}
*/
export const update = async (ctx) => {
  // 댓글 수정 내용 입력 검증
  const schema = Joi.object().keys({
    commentId: Joi.string().required(),
    toComment: Joi.string(),
    text: Joi.string().required(),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { commentId, toComment, text } = ctx.request.body;
  const updateData = { toComment, text, updatedAt: Date.now() };

  try {
    const comment = await Comment.findByIdAndUpdate(commentId, updateData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false일 때는 업데이트되기 전의 데이터를 반환합니다.
    }).exec();
    if (!comment) {
      ctx.status = 404;
      return;
    }
    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 댓글 제거
PATCH /api/comments/:id
{
    commentId: '댓글ObjectId',
}
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  const { commentId } = ctx.request.body;

  try {
    const comment = await Comment.findById(commentId);
    // 댓글이 존재하지 않을 때
    if (!comment) {
      ctx.status = 404; // Not Found
      return;
    }

    const updateData = { isDeleted: true, updatedAt: Date.now() };
    // 대댓글인 경우와 댓글인 경우
    if (comment.parentComment) {
      const delComment = await Comment.findByIdAndUpdate(
        commentId,
        updateData,
      ).exec();
      if (!delComment) {
        ctx.status = 404; // Not Found
        return;
      }
    } // 대댓글
    else {
      const query = { post: id, groupno: comment.groupno };
      await Comment.updateMany(query, { isDeleted: true }).exec();
    } // 댓글
    ctx.body = {
      msg: 'Success',
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
