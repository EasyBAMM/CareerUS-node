import React from "react";
import styles from "./AskModal.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AskModal = ({
  visible,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;
  return (
    <div className={cx("modal-container")}>
      <div className={cx("modal-content")}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={cx("modal-buttons")}>
          <button className={cx("modalbutton-publish")} onClick={onConfirm}>
            {confirmText}
          </button>
          <button className={cx("modalbutton-cancel")} onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskModal;
