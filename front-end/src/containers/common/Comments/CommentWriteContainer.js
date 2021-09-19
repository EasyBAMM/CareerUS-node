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

const CommentWriteContainer = ({ location }) => {
  // 댓글 입력 이벤트처리
  const [textarea, setTextarea] = useState("");
  const [actionActive, setActionActive] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  const dispatch = useDispatch();

  // 댓글 입력
  const onFocus = () => {
    setActionActive(true);
  };

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

  const { text, comment, commentError, originalCommentId } = useSelector(
    ({ comment }) => ({
      text: comment.text,
      comment: comment.comment,
      commentError: comment.commentError,
      originalCommentId: comment.originalCommentId,
    })
  );

  // 댓글 등록
  // 댓글 작성 ID
  const { postId, orderBy = "asc" } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const onPublish = () => {
    if (originalCommentId) {
      dispatch(updateComment({ id: originalCommentId, text }));
      return;
    }
    dispatch(
      writeComment({
        id: postId,
        text,
        orderBy,
      })
    );
  };

  // 댓글 취소
  const onCancel = () => {
    onChangeField({ key: "text", value: "" });
    setTextarea("");
    setActionActive(false);
  };

  // 댓글 수정
  // const onEdit = () => {
  //   dispatch(setOriginalPost(post));
  //   history.push("/write");
  // };

  // 댓글 삭제
  // const onRemove = async () => {
  //   try {
  //     await removePost(postId);
  //     history.push("/board/lists"); // 홈으로 이동
  //     alert("작성글이 삭제되었습니다.");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // 성공 혹은 실패 시 할 작업
  //   useEffect(() => {
  //     if (comment) {
  //       const { _id, user } = post;
  //       history.push(`/board/view/?username=${user.username}&postId=${_id}`);
  //     }
  //     if (postError) {
  //       console.log(postError);
  //       alert("포스트 등록에 실패했습니다.");
  //     }
  //   }, [history, post, postError]);

  return (
    <CommentWrite
      onChangeText={onChangeText}
      actionActive={actionActive}
      btnActive={btnActive}
      onFocus={onFocus}
      textarea={textarea}
      onCancel={onCancel}
      onPublish={onPublish}
    />
  );
};

export default withRouter(CommentWriteContainer);
