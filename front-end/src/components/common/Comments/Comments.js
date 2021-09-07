import React from "react";
import styles from "./Comments.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Comments = () => {
  return (
    <div className={cx("post-comments")}>
      <div className={cx("comments-header")}>
        <span>댓글 1개</span>
      </div>
      <div className={cx("comments-options")}>
        <h3>댓글</h3>
      </div>
      <ul className={cx("comments-list")}>
        <li className={cx("comment-item")}>
          <div className={cx("comment-area")}>
            <Link to="#" className={cx("comment-thumb")}>
              이미지
            </Link>
            <div className={cx("comment-box")}>
              <div className={cx("comment-nick-box")}>
                <Link to="#"></Link>
              </div>
              <div className={cx("comment-text-box")}>
                <span>댓글~</span>
              </div>
              <div className={cx("comment-info-box")}>
                <span>{new Date().toLocaleDateString()}</span>
                <Link to="#">답글쓰기</Link>
              </div>
            </div>
          </div>
        </li>
        <li className={cx("comment-item comment-reply")}>
          <div className={cx("comment-area")}>
            <Link to="#" className={cx("comment-thumb")}>
              이미지
            </Link>
            <div className={cx("comment-box")}>
              <div className={cx("comment-nick-box")}>
                <Link to="#"></Link>
              </div>
              <div className={cx("comment-text-box")}>
                <span>댓글~</span>
              </div>
              <div className={cx("comment-info-box")}>
                <span>{new Date().toLocaleDateString()}</span>
                <Link to="#">답글쓰기</Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Comments;
