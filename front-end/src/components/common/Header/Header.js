import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FiFileText, FiLogOut } from "react-icons/fi";

const cx = classNames.bind(styles);

const Header = ({ user, onLogout }) => {
  return (
    <div className={cx("header-container")}>
      <header>
        <h1>
          <Link to="/main">CareerUS</Link>
        </h1>
        <h2 className="hide">대메뉴</h2>
        <nav className={cx("lnb")}>
          <ul>
            <li>
              <Link to="/board/lists">
                <span>게시판</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>중고장터</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>인맥찾기</span>
              </Link>
            </li>
          </ul>
        </nav>
        <h2 className="hide">유저정보</h2>
        <nav className={cx("rnb")}>
          <ul>
            <li>
              <Link to="#">
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
      </header>
    </div>
  );
};

export default Header;
