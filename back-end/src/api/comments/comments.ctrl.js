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
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    text: Joi.string().required(),
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  // 작성자_id 게시글_id, 댓글내용을 저장한다.
  ctx.body = {
    author: ctx.state.user._id,
    post: ctx.state.post._id,
    text: ctx.request.body.text,
  };

  try {
    // 댓글 생성
    await Comment.create(ctx.body);
    console.log('댓글 생성됨: ', ctx.body);
  } catch (e) {
    // 댓글 생성 실패
    ctx.throw(500, e);
    console.log('err: ', e);
  }
};

/* 댓글 읽기
GET /api/comments/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }

  // 댓글 페이징 처리
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1, 50 을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);
  const limit = parseInt(ctx.query.limit || '50', 10);
  const sortType = ctx.query.sortType || 'createdAt';
  const skip = (page - 1) * limit; // 무시할 댓글의 수
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  // 댓글 쿼리 처리
  const query = { post: id };
  // .populate({path: 'author', select: 'username'})
  try {
    const comments = await Comment.find(query)
      .sort(sortType)
      .limit(limit)
      .skip(skip)
      .populate({ path: 'author', select: 'username' })
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
