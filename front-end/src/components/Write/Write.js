import React, { useCallback, useEffect, useRef } from "react";
import styles from "./Write.scss";
import classNames from "classnames/bind";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { upload } from "../../lib/api/upload";
import ImageResize from "quill-image-resize";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/imageResize", ImageResize);

const cx = classNames.bind(styles);

const Write = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null); // Quill을 적용한 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용을 작성하세요...",
      modules: {
        // 더 많은 옵션
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [
              "bold",
              "italic",
              "underline",
              "strike",
              { color: [] },
              { background: [] },
            ],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["blockquote", "code-block", "link", "image"],
          ],
        },
        imageUploader: {
          upload: (file) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("image", file);
              upload(formData)
                .then((response) => response)
                .then((result) => {
                  console.log(result.data);
                  resolve(result.data.url);
                })
                .catch((error) => {
                  reject("Upload failed");
                  console.error("Error:", error);
                  alert("이미지 업로드에 실패했습니다. (3MB 이하만 가능)");
                });
            });
          },
        },
        imageResize: {
          // See optional "config" below
          modules: [ 'Resize', 'DisplaySize' ]
        },
      },
    });

    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = useCallback(
    (e) => {
      if (e.target.value.length > 50) {
        alert("제목을 100byte(한글 50자) 이내로 입력하세요.");
        e.target.value = e.target.value.substr(0, 50);
      }
      onChangeField({ key: "title", value: e.target.value });
    },
    [onChangeField]
  );

  return (
    <div className={cx("write-container")}>
      <div className={cx("write-content")}>
        <input
          className={cx("write-title")}
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
          value={title}
        />
        <div className={cx("write-wrapper")}>
          <div ref={quillElement} />
        </div>
      </div>
    </div>
  );
};

export default Write;
