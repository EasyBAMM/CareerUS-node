import Joi from '@hapi/joi';
import User from '../../models/user';

/*
POST /api/auth/register
{
    username: 'velopert'
    password: 'mypass123'
    registerCode: 'careerus'
    name: '허준범'
    comment: '내 인생은 나의 것!'
}
*/
export const register = async (ctx) => {
  // 회원가입
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string()
      .regex(/^[a-zA-z0-9_-]{5,20}$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-z0-9|\S]{8,16}$/)
      .required(),
    passwordConfirm: Joi.string().required(),
    registerCode: Joi.string().required(),
    name: Joi.string()
      .regex(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z]{1,}$/)
      .required(),
    comment: Joi.string()
      .regex(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z0-9|\s!@#$%^&*-=+]{2,40}$/)
      .required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password, passwordConfirm, registerCode, name, comment } =
    ctx.request.body;
  try {
    // username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Confilct
      ctx.body = {
        message: '이미 사용중이거나 탈퇴한 아이디입니다.',
      };
      return;
    }

    // password 동일한 지 검사
    if (password !== passwordConfirm) {
      ctx.status = 412; // 전제 조건 실패
      ctx.body = {
        message: '비밀번호가 일치하지 않습니다.',
      };
      return;
    }

    // registerCode(가입코드) 검사
    if (registerCode !== 'careerus') {
      ctx.status = 412; // 전제 조건 실패
      ctx.body = {
        message: '가입코드가 일치하지 않습니다.',
      };
      return;
    }

    const user = new User({
      username,
      registerCode,
      name,
      comment,
    });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
POST /api/auth/login
{
    username: 'velopert',
    password: 'mypass123'
}
*/
export const login = async (ctx) => {
  // 로그인
  const { username, password } = ctx.request.body;

  // username, password가 없으면 에러 처리
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    ctx.body = {
      message: '아이디와 비밀번호를 입력해주세요.',
    };
    return;
  }

  try {
    const user = await User.findByUsername(username);
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        message: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
      };
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      ctx.body = {
        message: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
      };
      return;
    }
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/auth/check
*/
export const check = async (ctx) => {
  // 로그인 상태 확인
  const { user } = ctx.state;
  if (!user) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
POST /api/auth/logout
*/
export const logout = async (ctx) => {
  // 로그아웃
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
