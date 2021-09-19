import React, { useCallback, useEffect, useState } from "react";
import qs from "qs";
import Comments from "../../../components/common/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listComments, unloadListComments } from "../../../modules/comments";

const CommentsContainer = ({ location, history }) => {
  const { comments, error, loading, user } = useSelector(
    ({ comments, error, loading, user }) => ({
      comments: comments.comments,
      error: comments.error,
      loading: loading["comments/LIST_COMMENTS"],
      user: user.user,
    })
  );

  // 처음 마운트될 때 댓글 읽기 API 요청
  const { postId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const { page = 1, orderBy = "asc" } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listComments({ id: postId, page, orderBy }));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadListComments());
    };
  }, [dispatch, postId, location.search]);

  return (
    <Comments
      loading={loading}
      error={error}
      comments={comments}
      showWriteButton={user}
    />
  );
};

export default withRouter(CommentsContainer);
