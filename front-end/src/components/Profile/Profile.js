import React from "react";
import styles from "./Profile.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { RiUserFill, RiEdit2Fill, RiShoppingCart2Fill } from "react-icons/ri";
import About from "./About";

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx("profile-container")}>
      <div className={cx("profile-content-wrap")}>
        <div className={cx("profile-content")}>
          <div className={cx("content-left")}>
            <div className={cx("userimage-container")}>
              <div className={cx("userimage-wrap")}>
                <img
                  src="http://localhost:4000/images/1625674058699.png"
                  alt="userimage"
                />
              </div>
            </div>
            <div className={cx("edit-container")}>
              <Link to="#">Edit Profile</Link>
            </div>
            <div className={cx("work-container")}>
              <p className={cx("line-title")}>WORK</p>
              <ul className={cx("works")}>
                <li className={cx("work-item")}>네이버</li>
                <li className={cx("work-item")}>2021.05.05-</li>
                <li className={cx("work-item")}>AI융합학부</li>
                <li className={cx("work-item")}>2016.02-2021.02</li>
              </ul>
            </div>
            <div className={cx("skills-container")}>
              <p className={cx("line-title")}>SKILLS</p>
              <ul className={cx("skills")}>
                <li className={cx("skills-item")}>Branding</li>
                <li className={cx("skills-item")}>UI/UX</li>
                <li className={cx("skills-item")}>Web-Design</li>
                <li className={cx("skills-item")}>Packaging</li>
              </ul>
            </div>
          </div>
          <div className={cx("content-right")}>
            <div className={cx("userprofile-container")}>
              <div className={cx("userprofile-content")}>
                <div className={cx("userprofile-title")}>
                  <p className={cx("userprofile-username")}>qwerty</p>
                  <p className={cx("userprofile-userjob")}>Product Enginer</p>
                  <p className={cx("userprofile-usercomment")}>Hello world!</p>
                </div>
                <div className={cx("userprofile-body")}></div>
              </div>
            </div>
            <div className={cx("useraction-container")}>
              <ul className={cx("useraction-bar")}>
                <li className={cx("useraction-item ")}>
                  <Link to="#" className={cx("item-active")}>
                    <RiUserFill />
                    About
                  </Link>
                </li>
                <li className={cx("useraction-item")}>
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
                </li>
              </ul>
              <div className={cx("useraction-content")}>
                <About />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
