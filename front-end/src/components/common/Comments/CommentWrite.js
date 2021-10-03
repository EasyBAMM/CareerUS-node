import React from "react";
import styles from "./Comments.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

const cx = classNames.bind(styles);

const CommentWrite = ({
  onChangeText,
  actionActive,
  btnActive,
  onFocus,
  textarea,
  onCancel,
  onPublish,
  openEdit,
  parentComment,
  parentAuthor,
  user,
}) => {
  return (
    <div className={cx("comments")}>
      <div
        className={cx(
          "comment-item",
          { "comment-reply": parentComment },
          { "comment-update": openEdit }
        )}
      >
        <div className={cx("comment-area")}>
          <Link
            to={`/profile/view?username=${user.username}&userId=${user._id}`}
            className={cx("comment-thumb")}
          >
            <img
              src={
                user.image
                  ? user.image
                  : "http://localhost:4000/images/default.png"
              }
              alt="thumbnail"
            />
          </Link>
          <div className={cx("comment-box")}>
            <div className={cx("comment-write-box")}>
              <TextareaAutosize
                placeholder={
                  parentAuthor ? `@${parentAuthor}` : "댓글을 남겨보세요"
                }
                rows="1"
                onChange={onChangeText}
                value={textarea}
                onFocus={onFocus}
              />
            </div>
            <div
              className={cx("comment-action-box", {
                "action-active": actionActive,
              })}
            >
              <button className={cx("cancel-btn")} onClick={onCancel}>
                취소
              </button>
              <button
                className={cx("publish-btn", { "btn-active": btnActive })}
                onClick={onPublish}
                disabled={!btnActive}
              >
                {openEdit ? "수정" : "등록"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentWrite;
