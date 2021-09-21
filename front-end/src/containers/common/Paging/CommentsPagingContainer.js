import React, { useCallback } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import Paging from "../../../components/common/Paging/Paging";
import { withRouter } from "react-router-dom";

const CommentsPagingContainer = ({ history, location }) => {
  const isComments = true;
  const { comments, error, loading } = useSelector(({ comments, loading }) => ({
    comments: comments.comments,
    error: comments.error,
    loading: loading["comments/LIST_COMMENTS"],
  }));

  // page 버튼 클릭 시, 기존 url + page 추가
  const setPage = useCallback(
    (page) => {
      const {
        username,
        postId,
        orderBy = "asc",
      } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const query = qs.stringify({
        username,
        postId,
        page,
        orderBy,
      });
      history.push(location.pathname + `?${query}`);
    },
    [history, location.pathname, location.search]
  );

  return (
    <Paging
      lists={comments}
      error={error}
      loading={loading}
      onChangePage={setPage}
      isComments={isComments}
    />
  );
};

export default withRouter(CommentsPagingContainer);
