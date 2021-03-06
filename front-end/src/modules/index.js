import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import user, { userSaga } from "./user";
import write, { writeSaga } from "./write";
import post, { postSaga } from "./post";
import posts, { postsSaga } from "./posts";
import comments, { commentsSaga } from "./comments";
import comment, { commentSaga } from "./comment";
import profiles, { profilesSaga } from "./profiles";
import profile, { profileSaga } from "./profile";
import writeProfile, { writeProfileSaga } from "./writeProfile";

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  comments,
  comment,
  profiles,
  profile,
  writeProfile,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    commentsSaga(),
    commentSaga(),
    profilesSaga(),
    profileSaga(),
    writeProfileSaga(),
  ]);
}

export default rootReducer;
