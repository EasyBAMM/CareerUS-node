import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as commentsAPI from "../lib/api/comments";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "comment/INITIALIZE"; // 모든 내용 초기화
const CHANGE_FIELD = "comment/CHANGE_FIELD"; // 특정 key 값 바꾸기
const [WRITE_COMMENT, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE] =
  createRequestActionTypes("comment/WRITE_POST"); // 댓글 작성
const SET_ORIGINAL_COMMENT = "comment/SET_ORIGINAL_COMMENT"; // 댓글 수정 받아오기
const [UPDATE_COMMENT, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE] =
  createRequestActionTypes("write/UPDATE_POST"); // 댓글 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeComment = createAction(WRITE_COMMENT, ({ id, text }) => ({
  id,
  text,
}));
export const setOriginalComment = createAction(
  SET_ORIGINAL_COMMENT,
  (comment) => comment
);
export const updateComment = createAction(UPDATE_COMMENT, ({ id, text }) => ({
  id,
  text,
}));

// 사가 생성
const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  commentsAPI.writeComment
);
const updateCommentSaga = createRequestSaga(
  UPDATE_COMMENT,
  commentsAPI.updateComment
);

export function* commentSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(UPDATE_COMMENT, updateCommentSaga);
}

const initialState = {
  text: "",
  comment: null,
  commentError: null,
  originalCommentId: null,
};

const comment = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_COMMENT]: (state) => ({
      ...state,
      // comment commentError 초기화
      comment: null,
      commentError: null,
    }),
    // 댓글 작성 성공
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    // 댓글 작성 실패
    [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
    // 댓글 글 수정 받아오기
    [SET_ORIGINAL_COMMENT]: (state, { payload: comment }) => ({
      ...state,
      text: comment.text,
      originalCommentId: comment._id,
    }),
    // 댓글 글 수정 성공
    [UPDATE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    // 포스트 글 수정 실패
    [UPDATE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
  },
  initialState
);

export default comment;
