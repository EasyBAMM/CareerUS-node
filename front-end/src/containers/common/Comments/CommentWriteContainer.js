import React, { useCallback, useEffect, useState } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import CommentWrite from "../../../components/common/Comments/CommentWrite";
import {
  changeField,
  updateComment,
  writeComment,
} from "../../../modules/comment";
import { listComments } from "../../../modules/comments";

const CommentWriteContainer = ({
  parentAuthor,
  parentComment,
  originId,
  originToComment,
  originText,
  openReply,
  offReply,
  openEdit,
  offEdit,
  location,
}) => {
  const [textarea, setTextarea] = useState(""); // 댓글 입력 이벤트처리
  const [actionActive, setActionActive] = useState(false); // 댓글 입력창 UI표시
  const [btnActive, setBtnActive] = useState(false); // 등록(수정) 버튼
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  // 댓글 입력창
  const onFocus = () => {
    setActionActive(true);
  };

  // 댓글 입력
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );
  const onChangeText = useCallback(
    (e) => {
      if (e.target.value.length > 300) {
        alert("댓글을 300자 이내로 입력하세요.");
        e.target.value = e.target.value.substr(0, 300);
      }
      if (e.target.value.length > 0) {
        setBtnActive(true);
      } else {
        setBtnActive(false);
      }
      onChangeField({ key: "text", value: e.target.value });
      setTextarea(e.target.value);
    },
    [onChangeField]
  );

  // 댓글 작성 취소
  const onCancel = (e) => {
    onChangeField({ key: "text", value: "" });
    setTextarea("");
    setActionActive(false);
    // 부모 state 변경 함수, 댓글입력창을 공유해서 사용하기 때문에, 맨 위 댓글창에 수정, 대댓글 창없음
    if (openReply) {
      offReply(e);
    }
    if (openEdit) {
      offEdit(e);
    }
  };

  // 댓글 등록
  const onPublish = () => {
    const {
      postId,
      page = 1,
      orderBy = "asc",
    } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    // 개행문자 제거
    let toComment = undefined;
    let sendText = textarea.replace(/(?:\r\n|\r|\n){3,}/g, "\n\n\n").trim();
    const pattern = new RegExp(`^@${parentAuthor}`);
    if (sendText.match(pattern)) {
      sendText = sendText.replace(`@${parentAuthor}`, "");
      toComment = `${parentAuthor}`;
    }

    if (openEdit) {
      console.log("update publish 실행");
      console.log("sendText: ", sendText);
      dispatch(
        updateComment({
          id: postId,
          commentId: originId,
          toComment,
          text: sendText,
        })
      );
    } else {
      dispatch(
        writeComment({
          id: postId,
          parentComment,
          toComment,
          text: sendText,
        })
      );
    }
    dispatch(listComments({ id: postId, page, orderBy }));
    setTextarea("");
    setActionActive(false);
  };

  useEffect(() => {
    // 처음 댓글 작성 오픈 시 보여질 글 설정
    if (parentAuthor) {
      // 답글 달기로 열었을 때
      setTextarea(`@${parentAuthor} `);
    }
    if (openEdit) {
      // 댓글수정으로 열었을 때
      if (originToComment) {
        setTextarea(`@${originToComment} ${originText}`);
      } else {
        setTextarea(`${originText}`);
      }
    }
    return () => {
      setTextarea("");
    };
  }, [parentAuthor, openEdit, originToComment, originText]);

  return (
    <CommentWrite
      onChangeText={onChangeText}
      actionActive={actionActive}
      btnActive={btnActive}
      onFocus={onFocus}
      textarea={textarea}
      onCancel={onCancel}
      onPublish={onPublish}
      openEdit={openEdit}
      parentComment={parentComment}
      parentAuthor={parentAuthor}
      user={user}
    />
  );
};

export default withRouter(CommentWriteContainer);
