import { createAction, handleActions } from "redux-actions";
import * as profilesAPI from "../lib/api/profiles";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [READ_PROFILE, READ_PROFILE_SUCCESS, READ_PROFILE_FAILURE] =
  createRequestActionTypes("profile/READ_PROFILE");
const UNLOAD_PROFILE = "profile/UNLOAD_PROFILE"; // 프로필 페이지에서 벗어날 때 데이터 비우기

export const readProfile = createAction(READ_PROFILE, (id) => id);
export const unloadProfile = createAction(UNLOAD_PROFILE);

const readProfileSaga = createRequestSaga(
  READ_PROFILE,
  profilesAPI.readProfile
);
export function* profileSaga() {
  yield takeLatest(READ_PROFILE, readProfileSaga);
}

const initialState = {
  profile: null,
  error: null,
};

const profile = handleActions(
  {
    [READ_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      profile,
    }),
    [READ_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_PROFILE]: () => initialState,
  },
  initialState
);

export default profile;
