import React from "react";
import styles from "./About.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const About = () => {
  return (
    <div className={cx("useraction-about")}>
      <p className={cx("about-title")}>CONTACT INFORMATION</p>

      <ul className={cx("about")}>
        <li className={cx("about-item")}>
          <span className={cx("about-item-title")}>E-Mail:</span>
          <span className={cx("about-item-body")}>huhjb1020@naver.com</span>
        </li>
        <li className={cx("about-item")}>
          <span className={cx("about-item-title")}>SITE:</span>
          <span className={cx("about-item-body")}>
            https://github.com/EasyBAMM
          </span>
        </li>
      </ul>
    </div>
  );
};

export default About;
