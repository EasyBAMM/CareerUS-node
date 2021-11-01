import React from "react";
import styles from "./Profile.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { RiUserFill } from "react-icons/ri";
import About from "./About";

const cx = classNames.bind(styles);

const ProfileBlock = ({ profile, actionButton, onEdit }) => {
  const { username, name, comment, image, userjob, email, site, works, skills } = profile;
  const encrypt = (inputstr) => {
    let encryptStr = inputstr.substr(0, 2) + inputstr.substr(2, inputstr.length).replace(/./gi, "*");
    return encryptStr;
  };
  return (
    <div className={cx("profile-container")}>
      <div className={cx("profile-content-wrap")}>
        <div className={cx("profile-content")}>
          <div className={cx("content-left")}>
            <div className={cx("userimage-container")}>
              <div className={cx("userimage-wrap")}>
                <img src={image ? image : "http://localhost:4000/images/default.png"} alt="userimage" />
              </div>
            </div>
            <div className={cx("edit-container")}>
              {actionButton && (
                <button to="#" onClick={onEdit}>
                  Edit Profile
                </button>
              )}
            </div>
            <div className={cx("works-container")}>
              <p className={cx("line-title")}>WORKS</p>
              <ul className={cx("works")}>
                {works &&
                  works.map((work) => (
                    <li className={cx("work-item")} key={work}>
                      {work}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={cx("skills-container")}>
              <p className={cx("line-title")}>SKILLS</p>
              <ul className={cx("skills")}>
                {skills &&
                  skills.map((skill) => (
                    <li className={cx("skill-item")} key={skill}>
                      {skill}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={cx("content-right")}>
            <div className={cx("userprofile-container")}>
              <div className={cx("userprofile-content")}>
                <div className={cx("userprofile-title")}>
                  <p className={cx("userprofile-username")}>
                    {name && name} {username && `(${encrypt(username)})`}
                  </p>
                  <p className={cx("userprofile-userjob")}>{userjob && userjob}</p>
                  <p className={cx("userprofile-usercomment")}>{comment && comment}</p>
                </div>
                <div className={cx("userprofile-body")}></div>
              </div>
            </div>
            <div className={cx("useraction-container")}>
              <ul className={cx("useraction-bar")}>
                <li className={cx("useraction-item ")}>
                  <Link to="#" className={cx("item-active")} onClick={(e) => e.preventDefault()}>
                    <RiUserFill />
                    About
                  </Link>
                </li>
                {/* <li className={cx("useraction-item")}>
                  <Link to="#">
                    <RiEdit2Fill />
                    Post
                  </Link>
                </li>
                <li className={cx("useraction-item")}>
                  <Link to="#">
                    <RiShoppingCart2Fill />
                    Store
                  </Link>
                </li> */}
              </ul>
              <div className={cx("useraction-content")}>
                <About email={email && email} site={site && site} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ profile, loading, error, actionButton, onEdit }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      const profile = { name: "존재하지 않는 유저입니다." };
      return <ProfileBlock profile={profile} />;
    }
    const profile = { name: "잘못된 요청정보입니다." };
    return <Profile profile={profile} />;
  }

  // 로딩 중이거나 아직 프로픨 데이터가 없을 때
  if (loading || !profile) {
    const profile = { name: "로딩 중입니다..." };
    return <Profile profile={profile} />;
  }
  return <ProfileBlock profile={profile} actionButton={actionButton} onEdit={onEdit} />;
};

export default Profile;
