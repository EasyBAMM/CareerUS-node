import React from "react";
import styles from "./WriteActionButtons.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
  return (
    <div className={cx("writeactionbuttons-container")}>
      <div className={cx("writeactionbuttons-content")}>
        <button className={cx("writeactionbutton-publish")} onClick={onPublish}>
          포스트 {isEdit ? "수정" : "등록"}
        </button>
        <button className={cx("writeactionbutton-cancel")} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default WriteActionButtons;
