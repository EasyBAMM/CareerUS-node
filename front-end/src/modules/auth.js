import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";
import { takeLatest } from "redux-saga/effects";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  })
);

// register, login
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const register = createAction(
  REGISTER,
  ({ username, password, passwordConfirm, registerCode, name, comment }) => ({
    username,
    password,
    passwordConfirm,
    registerCode,
    name,
    comment,
  })
);
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

// 사가(제너레이터) 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    registerCode: "",
    name: "",
    comment: "",
  },
  login: {
    username: "",
    password: "",
  },
  authLogin: null,
  authLoginError: null,
  authRegister: null,
  authRegisterError: null,
};

const auth = handleActions(
  {
    // login, register form 입력
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // state.register.username
      }),
    // login, register form 초기화
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      // 폼 전환 시 회원 인증 에러 초기화
      authLoginError: null,
      authRegisterError: null,
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: authRegister }) => ({
      ...state,
      authRegisterError: null,
      authRegister,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authRegisterError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: authLogin }) => ({
      ...state,
      authLoginError: null,
      authLogin,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authLoginError: error,
    }),
  },
  initialState
);

export default auth;
