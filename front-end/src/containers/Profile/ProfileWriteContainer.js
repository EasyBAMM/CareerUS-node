import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileWrite from "../../components/ProfileWrite/ProfileWrite";
import { upload } from "../../lib/api/upload";
import { changeField, initialize, updateProfile } from "../../modules/writeProfile";
import { withRouter } from "react-router";
import { logout } from "../../modules/user";

const ProfileWriteContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { username, name, userjob, comment, image, email, site, works, skills, profile, error, originalProfileId } = useSelector(
    ({ writeProfile }) => ({
      username: writeProfile.username,
      name: writeProfile.name,
      userjob: writeProfile.userjob,
      comment: writeProfile.comment,
      image: writeProfile.image,
      email: writeProfile.email,
      site: writeProfile.site,
      works: writeProfile.works,
      skills: writeProfile.skills,
      profile: writeProfile.profile,
      error: writeProfile.error,
      originalProfileId: writeProfile.originalProfileId,
    })
  );

  const profileData = {
    username,
    name,
    comment,
    image,
    userjob,
    email,
    site,
    works,
    skills,
    profile,
    error,
    originalProfileId,
  };

  // 프로필 정보 입력
  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch]);
  const onChangeInput = useCallback(
    (e) => {
      onChangeField({ key: e.target.name, value: e.target.value });
    },
    [onChangeField]
  );

  // 프로필 이미지 등록
  const onChangeUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await upload(formData);
        if (res.data.url) {
          onChangeField({ key: "image", value: res.data.url });
        }
      } catch (error) {
        console.error("Error:", error);
        alert("이미지 업로드에 실패했습니다. (3MB 이하만 가능)");
      }
    } else {
      console.log("파일 형식이 잘못되었습니다.");
      alert("파일 형식이 잘못되었습니다.");
    }
  };

  // 프로필 이미지 삭제
  const onClickDelete = (e) => {
    onChangeField({ key: "image", value: "http://localhost:4000/images/defaultprofile.png" });
  };

  // 경력, 스킬 입력
  const onChangeWorks = (nextWorks) => {
    dispatch(
      changeField({
        key: "works",
        value: nextWorks,
      })
    );
  };
  const onChangeSkills = (nextWorks) => {
    dispatch(
      changeField({
        key: "skills",
        value: nextWorks,
      })
    );
  };

  // 프로필 수정 확인
  // 포스트 등록
  const onPublish = () => {
    if (name.trim() === "") {
      alert("이름을 입력하세요.");
      return;
    }
    if (comment.trim() === "") {
      alert("소개글을 입력하세요.");
      return;
    }

    const confirm = window.confirm("프로필 정보를 수정하시겠습니까?");
    if (confirm) {
      if (originalProfileId) {
        dispatch(updateProfile({ name, comment, image, userjob, email, site, works, skills, id: originalProfileId }));
        return;
      }
    }
  };

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (profile) {
      alert("프로필 수정이 성공되었습니다! 다시 로그인해주세요.");
      dispatch(logout());
      // history.push(`/profile/view?username=${username}&userId=${originalProfileId}`);
    }
    if (error) {
      console.log(error);
      alert("프로필 수정에 실패했습니다.");
    }
  }, [history, profile, error, dispatch]);

  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <ProfileWrite
      profileData={profileData}
      onChangeInput={onChangeInput}
      onChangeWorks={onChangeWorks}
      onChangeSkills={onChangeSkills}
      onChangeUploadImage={onChangeUploadImage}
      onClickDelete={onClickDelete}
      onPublish={onPublish}
    />
  );
};

export default withRouter(ProfileWriteContainer);
