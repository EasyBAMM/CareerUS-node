import React from "react";
import styles from "./PostHead.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PostHead = ({ category, tags, children }) => {
  return (
    <div className={cx("post-container")}>
      <div className={cx("post-content")}>
        <div className={cx("post-head")}>
          <h2>
            <Link to="/board/lists">{category}</Link>
          </h2>
        </div>
        <div className={cx("post-body")}>
          <div className={cx("post-tags")}>
            {tags &&
              tags.map((tag) => (
                <Link
                  className={cx("post-tag")}
                  to={`/board/lists/?tag=${tag}`}
                  key={tag}
                >
                  #{tag}
                </Link>
              ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PostHead;
