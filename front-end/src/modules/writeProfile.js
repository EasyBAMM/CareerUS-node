import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as profilesAPI from "../lib/api/profiles";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "writeProfile/INITIALIZE"; // 모든 내용 초기화
const CHANGE_FIELD = "writeProfile/CHANGE_FIELD"; // 특정 key 값 바꾸기
const SET_ORIGINAL_PROFILE = "writeProfile/SET_ORIGINAL_PROFILE"; // 프로필 수정 받아오기
const [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE] = createRequestActionTypes("profilewrite/UPDATE_PROFILE"); // 프로필 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const setOriginalProfile = createAction(SET_ORIGINAL_PROFILE, (profile) => profile);
export const updateProfile = createAction(UPDATE_PROFILE, ({ id, name, comment, image, userjob, email, site, works, skills }) => ({
  id,
  name,
  comment,
  image,
  userjob,
  email,
  site,
  works,
  skills,
}));

// 사가 생성
const updateProfileSaga = createRequestSaga(UPDATE_PROFILE, profilesAPI.updateProfile);

export function* writeProfileSaga() {
  yield takeLatest(UPDATE_PROFILE, updateProfileSaga);
}

const initialState = {
  username: "",
  name: "",
  comment: "",
  image: "",
  userjob: "",
  email: "",
  site: "",
  works: [],
  skills: [],
  profile: null,
  error: null,
  originalProfileId: null,
};

const writeProfile = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    // 프로필 수정 받아오기
    [SET_ORIGINAL_PROFILE]: (state, { payload: profile }) => ({
      ...state,
      username: profile.username,
      name: profile.name,
      userjob: profile.userjob,
      comment: profile.comment,
      image: profile.image,
      email: profile.email,
      site: profile.site,
      works: profile.works !== undefined ? profile.works : [],
      skills: profile.skills !== undefined ? profile.skills : [],
      originalProfileId: profile._id,
    }),
    // 프로필 수정 성공
    [UPDATE_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      profile,
    }),
    // 프로필 수정 실패
    [UPDATE_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default writeProfile;
