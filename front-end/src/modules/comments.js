import { createAction, handleActions } from "redux-actions";
import * as commentsAPI from "../lib/api/comments";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [LIST_COMMENTS, LIST_COMMENTS_SUCCESS, LIST_COMMENTS_FAILURE] =
  createRequestActionTypes("comments/LIST_COMMENTS");
const UNLOAD_LIST_COMMENTS = "comments/UNLOAD_LIST_COMMENTS"; // 리스트 페이지에서 벗어날 때 데이터 비우기

export const listComments = createAction(
  LIST_COMMENTS,
  ({ id, page, orderBy }) => ({
    id,
    page,
    orderBy,
  })
);
export const unloadListComments = createAction(UNLOAD_LIST_COMMENTS);

const listCommentsSaga = createRequestSaga(
  LIST_COMMENTS,
  commentsAPI.listComments
);
export function* commentsSaga() {
  yield takeLatest(LIST_COMMENTS, listCommentsSaga);
}

const initialState = {
  comments: null,
  error: null,
};

const comments = handleActions(
  {
    [LIST_COMMENTS_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
    }),
    [LIST_COMMENTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_LIST_COMMENTS]: () => initialState,
  },
  initialState
);

export default comments;
