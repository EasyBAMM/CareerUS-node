import React, { useRef } from "react";
import styles from "./ProfileWrite.scss";
import classNames from "classnames/bind";
import Works from "./Works";
import Skills from "./Skills";

const cx = classNames.bind(styles);

const ProfileWrite = ({ profileData, onChangeInput, onChangeWorks, onChangeSkills, onChangeUploadImage, onClickDelete, onPublish }) => {
  const fileInputRef = useRef(null);
  const onPublishImage = (e) => {
    fileInputRef.current.click();
  };

  return (
    <div className={cx("profilewrite-container")}>
      <div className={cx("profilewrite-content-wrap")}>
        <div className={cx("profilewrite-content")}>
          <h1 className={cx("profilewrite-title")}>프로필 정보</h1>
          <table className={cx("profilewrite-table")}>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>
                  <p>{profileData.username}</p>
                </td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>
                  <input type="text" id="name" name="name" className={cx("input-name")} value={profileData.name} onChange={onChangeInput} required />
                </td>
              </tr>
              <tr>
                <td>분야</td>
                <td>
                  <input type="text" id="nickname" name="userjob" className={cx("input-job")} value={profileData.userjob} onChange={onChangeInput} />
                </td>
              </tr>
              <tr>
                <td>소개글</td>
                <td>
                  <textarea
                    className={cx("input-textarea")}
                    cols="80"
                    rows="3"
                    name="comment"
                    value={profileData.comment}
                    onChange={onChangeInput}
                    required
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>프로필 이미지</td>
                <td>
                  <div className={cx("profileimg-wrap")}>
                    <img
                      className={cx("profileimg")}
                      src={profileData.image ? profileData.image : "http://localhost:4000/images/defaultprofile.png"}
                      alt="프로필이미지"
                    />
                  </div>
                  <div className={cx("profileimg-info")}>
                    <div className={cx("profile-upload")}>
                      <input type="file" ref={fileInputRef} onChange={onChangeUploadImage} name="image" accept="image/*" />
                      <button className={cx("btn-img btn-post")} onClick={onPublishImage}>
                        등록
                      </button>
                    </div>
                    <button className={cx("btn-img btn-del")} onClick={onClickDelete}>
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>E-Mail</td>
                <td>
                  <input type="text" id="email" name="email" className={cx("input-email")} value={profileData.email} onChange={onChangeInput} />
                </td>
              </tr>
              <tr>
                <td>Site</td>
                <td>
                  <input type="text" id="site" name="site" className={cx("input-site")} value={profileData.site} onChange={onChangeInput} />
                </td>
              </tr>
              <tr>
                <td>Works</td>
                <td>
                  <Works works={profileData.works} onChangeWorks={onChangeWorks} />
                </td>
              </tr>
              <tr>
                <td>Skills</td>
                <td>
                  <Skills skills={profileData.skills} onChangeSkills={onChangeSkills} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={cx("profilewrite-action")}>
            <button className={cx("action-post")} onClick={onPublish}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrite;
