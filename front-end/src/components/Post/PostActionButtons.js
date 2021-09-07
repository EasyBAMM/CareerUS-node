import React, { useState } from "react";
import styles from "./PostActionButtons.scss";
import classNames from "classnames/bind";
import AskRemoveModal from "./AskRemoveModal";

const cx = classNames.bind(styles);

const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <div className={cx("postactionbuttons-container")}>
        <div className={cx("postactionbuttons-content")}>
          <button className={cx("postactionbutton-publish")} onClick={onEdit}>
            수정
          </button>
          <button
            className={cx("postactionbutton-cancel")}
            onClick={onRemoveClick}
          >
            삭제
          </button>
        </div>
      </div>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButtons;
