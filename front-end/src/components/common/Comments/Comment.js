import React from "react";
import styles from "./Comments.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import CommentWriteContainer from "../../../containers/common/Comments/CommentWriteContainer";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const cx = classNames.bind(styles);

const Comment = ({
  comment,
  showWriteButton,
  datePrint,
  openReply,
  toggleReply,
  offReply,
  onRemove,
  openEdit,
  onEdit,
  offEdit,
}) => {
  const { _id, author, parentComment, toComment, text, createdAt } = comment;

  // 글 작성자 확인
  const ownComment =
    (showWriteButton && showWriteButton._id) === (author && author._id);

  return (
    <li className={cx("comment-item", { "comment-reply": parentComment })}>
      <div className={cx("comment-area", { "comment-area-none": openEdit })}>
        <Link
          to={`/profile/view?username=${author.username}&userId=${author._id}`}
          className={cx("comment-thumb")}
        >
          <img src={author.image} alt="thumbnail" />
        </Link>
        <div className={cx("comment-box")}>
          <div className={cx("comment-nick-box")}>
            <Link
              to={`/profile/view?username=${author.username}&userId=${author._id}`}
            >
              {author.name}
            </Link>
          </div>
          <div className={cx("comment-text-box")}>
            <p className={cx("comment-text-view")}>
              {toComment && (
                <span className={cx("text-nickname")}>@{toComment}</span>
              )}
              <span className={cx("text-comment")}>{text}</span>
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
                onClick={toggleReply}
              >
                답글쓰기
              </Link>
            )}
          </div>
        </div>
        {ownComment && (
          <div className={cx("comment-tool")}>
            <Link to="#" className={cx("tool-update-btn")} onClick={onEdit}>
              <AiFillEdit />
            </Link>
            <Link to="#" className={cx("tool-delete-btn")} onClick={onRemove}>
              <AiFillDelete />
            </Link>
          </div>
        )}
      </div>
      {(openReply || openEdit) && (
        <CommentWriteContainer
          parentAuthor={author.name}
          parentComment={_id}
          originId={_id}
          originToComment={toComment}
          originText={text}
          openReply={openReply}
          offReply={offReply}
          openEdit={openEdit}
          onEdit={onEdit}
          offEdit={offEdit}
        />
      )}
    </li>
  );
};

export default Comment;
