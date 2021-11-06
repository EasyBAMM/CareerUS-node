import { createAction, handleActions } from "redux-actions";
import * as profilesAPI from "../lib/api/profiles";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [LIST_PROFILES, LIST_PROFILES_SUCCESS, LIST_PROFILES_FAILURE] =
  createRequestActionTypes("profiles/LIST_PROFILES");
const UNLOAD_LIST_PROFILES = "profiles/UNLOAD_LIST_PROFILES"; // 리스트 페이지에서 벗어날 때 데이터 비우기

export const listProfiles = createAction(
  LIST_PROFILES,
  ({ keyword, page, limit }) => ({
    keyword,
    page,
    limit,
  })
);
export const unloadListProfiles = createAction(UNLOAD_LIST_PROFILES);

const listProfilesSaga = createRequestSaga(
  LIST_PROFILES,
  profilesAPI.listProfiles
);
export function* profilesSaga() {
  yield takeLatest(LIST_PROFILES, listProfilesSaga);
}

const initialState = {
  profiles: null,
  error: null,
};

const profiles = handleActions(
  {
    [LIST_PROFILES_SUCCESS]: (state, { payload: profiles }) => ({
      ...state,
      profiles,
    }),
    [LIST_PROFILES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_LIST_PROFILES]: () => initialState,
  },
  initialState
);

export default profiles;
