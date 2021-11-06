/* 프로필 목록 조회
GET /api/profiles?username=&tag=&page=
*/

import User from '../../models/user';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

// 글 작성 sanitize 옵션
const sanitizeOption = {
  allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'span'],
};

// function: 프로필 목록 검색
const createSearchQuery = (queries) => {
  // keyword로 검색
  const { keyword } = queries;
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const searchQuery = {};
  // 검색조건, 검색명으로 쿼리문 조건 설정
  if (keyword && keyword.length >= 2) {
    const profileQueries = [];

    // 전체
    profileQueries.push({ name: { $regex: new RegExp(keyword, 'i') } });
    profileQueries.push({ comment: { $regex: new RegExp(keyword, 'i') } });
    profileQueries.push({ userjob: { $regex: new RegExp(keyword, 'i') } });
    profileQueries.push({ skills: { $regex: new RegExp(keyword, 'i') } });
    profileQueries.push({ works: { $regex: new RegExp(keyword, 'i') } });

    if (profileQueries.length > 0) {
      searchQuery['$or'] = profileQueries;
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
    // 등록 코드, 암호는 제거
    const selectFields = '_id username name userjob image comment views';
    const profiles = await User.find(query, selectFields)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();

    const profileCount = await User.countDocuments(query).exec(); // 전체 게시물 수
    // 게시글, 현재 페이지, 한 번에 보여지는 수, 전체 게시글 수
    ctx.body = {
      profiles: profiles,
      currentPage: page,
      limit: limit,
      count: profileCount,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 특정 프로필(id) - read, delete, update 미들웨어
export const getProfileById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    // registerCode: 0,
    // hashedPassword: 0,
    const profile = await User.findById(id, {
      registerCode: 0,
      hashedPassword: 0,
    }).exec();
    // 프로필이 존재하지 않을 때
    if (!profile) {
      ctx.status = 404; // Not Found
      return;
    }
    // 조회수 +1
    // 쿠키 "profile._id": "ip"
    const checkViews = ctx.cookies.get(String(profile._id));
    if (!checkViews) {
      const addr =
        ctx.headers['x-forwarded-for'] ||
        ctx.connection.remoteAddress ||
        ctx.socket.remoteAddress ||
        ctx.connection.socket.remoteAddress ||
        null;
      if (addr) {
        ctx.cookies.set(profile._id, addr, {
          maxAge: 1000 * 60 * 10 * 1, // 10 분
          httpOnly: true,
        });
        profile.views++; // 조회수 +1
        await profile.save();
      }
    }

    ctx.state.profile = profile;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 글 수정, 삭제 권한 미들웨어
export const checkOwnProfile = (ctx, next) => {
  const { user, profile } = ctx.state;
  if (profile._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/* 특정 프로필 조회
GET /api/posts/:username
*/
export const read = (ctx) => {
  ctx.body = ctx.state.profile;
};

/* 프로필 수정
PATCH /api/posts/:username
{ 
    name: '수정',
    comment: '수정 내용',
    image: '수정 이미지 url',
}
*/
export const update = async (ctx) => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    name: Joi.string()
      .regex(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z]{2,20}$/)
      .required(),
    comment: Joi.string()
      .regex(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z0-9|\s!@#$%^&*-=+]{2,40}$/)
      .required(),
    image: Joi.string(),
    userjob: Joi.string(),
    email: Joi.string(),
    site: Joi.string(),
    works: Joi.array().items(Joi.string()),
    skills: Joi.array().items(Joi.string()),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  if (nextData.comment) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const profile = await User.findByIdAndUpdate(id, nextData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false일 때는 업데이트되기 전의 데이터를 반환합니다.
    }).exec();
    if (!profile) {
      ctx.status = 404;
      return;
    }
    ctx.body = { ok: true, msg: 'success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};
