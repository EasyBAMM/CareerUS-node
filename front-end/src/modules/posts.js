import { createAction, handleActions } from "redux-actions";
import * as postsAPI from "../lib/api/posts";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] =
  createRequestActionTypes("posts/LIST_POSTS");
const UNLOAD_LIST_POSTS = "posts/UNLOAD_LIST_POSTS"; // 리스트 페이지에서 벗어날 때 데이터 비우기

export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page, limit }) => ({ tag, username, page, limit })
);
export const unloadListPosts = createAction(UNLOAD_LIST_POSTS);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      posts,
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_LIST_POSTS]: () => initialState,
  },
  initialState
);

export default posts;
