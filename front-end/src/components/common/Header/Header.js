import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FiFileText, FiLogOut, FiMenu } from "react-icons/fi";

const cx = classNames.bind(styles);

const Header = ({ user, onLogout, onActive, active }) => {
  return (
    <div className={cx("header-container")}>
      <header>
        <h1>
          <Link to="/board/lists">CareerUS</Link>
        </h1>
        <h2 className="hide">대메뉴</h2>
        <nav className={cx("lnb", { active })}>
          <ul>
            <li>
              <Link to="/board/lists">
                <span>게시판</span>
              </Link>
            </li>
            <li>
              <Link to="/board/lists">
                <span>중고장터</span>
              </Link>
            </li>
            <li>
              <Link to="/profile/lists">
                <span>인맥찾기</span>
              </Link>
            </li>
          </ul>
        </nav>
        <h2 className="hide">유저정보</h2>
        <nav className={cx("rnb", { active })}>
          <ul>
            <li>
              <Link to={user ? `/profile/view?username=${user.username}&userId=${user._id}` : "#"}>
                <FiFileText />
                {user && user.name ? user.name + "님" : "마이페이지"}
              </Link>
            </li>
            <li>
              <Link to="#" onClick={onLogout}>
                <FiLogOut />
                로그아웃
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mobile-slide">
          <h4 className="hide">모바일토글바</h4>
          <span className={cx("slide-btn", { active })} onClick={onActive}>
            <FiMenu />
          </span>
        </div>
      </header>
    </div>
  );
};

export default Header;
