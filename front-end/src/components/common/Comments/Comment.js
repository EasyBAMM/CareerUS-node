import React, { useState } from "react";
import styles from "./Comments.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import CommentWriteContainer from "../../../containers/common/Comments/CommentWriteContainer";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const cx = classNames.bind(styles);

const datePrint = (createdAt) => {
  // const postDate = new Date(publishedDate);
  const postDate = new Date(createdAt);
  return (
    postDate.toLocaleDateString() +
    " " +
    postDate.getHours() +
    ":" +
    postDate.getMinutes()
  );
};

const Comment = ({ comment, showWriteButton }) => {
  const [openReply, setOpenReply] = useState(false);
  const onClickReply = (e) => {
    e.preventDefault();
    setOpenReply((openReply) => !openReply);
  };
  const { author, text, createdAt, parentComment, _id } = comment;

  // 글 작성자 확인
  const ownComment =
    (showWriteButton && showWriteButton._id) === (author && author._id);

  return (
    <li className={cx("comment-item", { "comment-reply": parentComment })}>
      <div className={cx("comment-area")}>
        <Link to="#" className={cx("comment-thumb")}>
          <img src={author.image} alt="thumbnail" />
        </Link>
        <div className={cx("comment-box")}>
          <div className={cx("comment-nick-box")}>
            <Link to="#">{author.username}</Link>
          </div>
          <div className={cx("comment-text-box")}>
            <p className={cx("comment-text-view")}>
              <div className={cx("text-comment")}>{text}</div>
            </p>
          </div>
          <div className={cx("comment-info-box")}>
            <span className={cx("comment-info-date")}>
              {datePrint(createdAt)}
            </span>
            {showWriteButton && (
              <Link
                to="#"
                className={cx("comment-info-btn")}
                onClick={onClickReply}
              >
                답글쓰기
              </Link>
            )}
          </div>
        </div>
        {ownComment && (
          <div className={cx("comment-tool")}>
            <Link to="#" className={cx("tool-update-btn")}>
              <AiFillEdit />
            </Link>
            <Link to="#" className={cx("tool-delete-btn")}>
              <AiFillDelete />
            </Link>
          </div>
        )}
      </div>
      {openReply && (
        <CommentWriteContainer
          parentAuthor={author.username}
          parentComment={_id}
        />
      )}
    </li>
  );
};

export default Comment;
