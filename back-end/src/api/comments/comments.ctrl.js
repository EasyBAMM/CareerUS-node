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

/* 댓글 작성
POST /api/comments/:id
*/
export const write = async (ctx) => {
  console.log('comment write');
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    text: Joi.string().required(),
    parentComment: Joi.string(),
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
  const { text, parentComment } = ctx.request.body;
  if (parentComment) {
    try {
      // 1. 부모 댓글 정보가져오기
      const parentCommentData = await Comment.findById(parentComment)
        .lean()
        .exec();

      // 2. 부모 댓글의 그룹번호를 물려받기, (깊이는 사실 필요없음 2단계까지만 표시)
      const depth = parentCommentData.depth + 1;
      const groupno = parentCommentData.groupno;
      const inputComment = {
        author: ctx.state.user._id,
        post: ctx.state.post._id,
        parentComment,
        depth,
        groupno,
        text: text,
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
GET /api/comments/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.query;
  console.log(ctx.query);
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
  const query = { post: id };
  // .populate({path: 'author', select: 'username'})
  try {
    const comments = await Comment.find(query)
      .sort({ groupno: orderBy, createdAt: orderBy })
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
