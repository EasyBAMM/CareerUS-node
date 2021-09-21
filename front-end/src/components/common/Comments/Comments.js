import React from "react";
import styles from "./Comments.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import CommentWriteContainer from "../../../containers/common/Comments/CommentWriteContainer";
import Comment from "./Comment";

const cx = classNames.bind(styles);

const Comments = ({
  comments,
  loading,
  error,
  showWriteButton,
  orderBy,
  onChangeSelect,
}) => {
  return (
    <div className={cx("comments-container")}>
      <div className={cx("comments-content")}>
        <div className={cx("comments-header")}>
          <Link to="#" className={cx("comments-button")}>
            <span className={cx("comments-icon")}>
              <FaRegCommentDots /> 댓글
            </span>
            <span className={cx("comments-num")}>
              {!loading && comments && <>{comments.count}</>}
            </span>
          </Link>
          {/* value={limit} onChange={onChangeSelect} */}
          <select value={orderBy} onChange={onChangeSelect}>
            <option value="asc">등록순</option>
            <option value="desc">최신순</option>
          </select>
        </div>
        {/* 댓글 작성 컨테이너 */}
        {showWriteButton && <CommentWriteContainer />}
        {/* 로딩 중이 아니고, 댓글 배열이 존재할 때만 보여 줌 */}
        {!loading && comments && (
          <ul className={cx("comments")}>
            {comments.count > 0 ? (
              comments.comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment._id}
                  showWriteButton={showWriteButton}
                />
              ))
            ) : (
              <li></li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Comments;
