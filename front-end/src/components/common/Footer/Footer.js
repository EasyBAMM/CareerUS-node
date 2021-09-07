import React from "react";
import styles from "./Footer.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("footer-container")}>
      <footer>
        <p>CareerUS</p>
        <div className={cx("finfo-wrap")}>
          <ul className={cx("flinfo")}>
            <li>주소 : 서울시 동작구 상도로 369 숭실대학교 형남공학관 424호</li>
            <li>Tel : 02-820-0950</li>
          </ul>
          <ul className={cx("fcinfo")}>
            <li>
              <Link to="/sitemap">SITEMAP</Link>
            </li>
            <li>
              <Link to="/aboutus">ABOUT US</Link>
            </li>
          </ul>
          <div className={cx("frinfo")}>
            <Link
              to={{ pathname: "https://github.com/zaehuun/CareerUS" }}
              target="_blank"
            >
              <AiFillGithub />
              <span className="hide">Github</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
