import React from "react";
import styles from "./PageTemplate.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => {
  return (
    <div className={cx("page-template")}>
      <Link to="#content" className="skip">
        본문바로가기
      </Link>
      {children}
    </div>
  );
};

export default PageTemplate;
