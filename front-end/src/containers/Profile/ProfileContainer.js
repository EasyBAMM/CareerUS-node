import React, { useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router";
import Profile from "../../components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { readProfile, unloadProfile } from "../../modules/profile";

const ProfileContainer = ({ location, history }) => {
  // 처음 마운트될 때 프로필 읽기 API 요청
  const { userId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const dispatch = useDispatch();
  const { profile, error, loading, user } = useSelector(
    ({ profile, loading, user }) => ({
      profile: profile.profile,
      error: profile.error,
      loading: loading["profile/READ_PROFILE"],
      user: user.user,
    })
  );

  useEffect(() => {
    dispatch(readProfile(userId));
    // 언마운트될 때 리덕스에서 프로필 데이터 없애기
    return () => {
      dispatch(unloadProfile());
    };
  }, [dispatch, userId]);

  // 프로필 수정
  // const onEdit = () => {
  //   dispatch(setOriginalProfile(profile));
  //   history.push("/profile")
  // };

  // 프로필 작성자 확인
  const ownProfile = (user && user._id) === (profile && profile._id);

  return (
    <Profile
      profile={profile}
      loading={loading}
      error={error}
      actionButton={ownProfile}
    />
  );
};

export default withRouter(ProfileContainer);
