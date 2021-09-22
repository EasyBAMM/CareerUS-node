import React, { useState } from "react";
import qs from "qs";
import { withRouter } from "react-router";
import Comment from "../../../components/common/Comments/Comment";
import { removeComment } from "../../../lib/api/comments";
import { listComments } from "../../../modules/comments";
import { useDispatch } from "react-redux";

const CommentContainer = ({
  location,
  comment,
  showWriteButton,
  datePrint,
}) => {
  // 댓글 작성 창 열기, 닫기
  const [openReply, setOpenReply] = useState(false);
  const toggleReply = (e) => {
    e.preventDefault();
    setOpenReply((openReply) => !openReply);
  };
  const offReply = (e) => {
    e.preventDefault();
    setOpenReply(false);
  };
  // 댓글 수정 창 열기, 닫기
  const [openEdit, setOpenEdit] = useState(false);
  const onEdit = (e) => {
    e.preventDefault();
    setOpenEdit(true);
    console.log("onEdit 클릭됨");
  };
  const offEdit = (e) => {
    e.preventDefault();
    setOpenEdit(false);
    console.log("offEdit 클릭됨");
  };

  // 댓글 삭제
  const dispatch = useDispatch();
  const onRemove = async (e) => {
    e.preventDefault();
    let msg = "댓글을 삭제하시겠습니까?"; // 대댓글인 경우
    if (!comment.parentComment) {
      msg = "내 댓글 및 댓글에 달린 모든 답글을 삭제하시겠습니까?";
    }
    if (window.confirm(msg)) {
      // 삭제할 댓글 id, 포스트 id 가져오기
      const { _id } = comment;
      const {
        postId,
        page = 1,
        orderBy = "asc",
      } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      try {
        await removeComment({ id: postId, commentId: _id });
      } catch (e) {
        console.log(e);
      }
      dispatch(listComments({ id: postId, page, orderBy }));
    }
  };

  return (
    <Comment
      comment={comment}
      showWriteButton={showWriteButton}
      datePrint={datePrint}
      openReply={openReply}
      toggleReply={toggleReply}
      offReply={offReply}
      onRemove={onRemove}
      openEdit={openEdit}
      onEdit={onEdit}
      offEdit={offEdit}
    />
  );
};

export default React.memo(withRouter(CommentContainer));
