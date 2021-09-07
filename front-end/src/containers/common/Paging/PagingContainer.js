import React, { useCallback } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import Paging from "../../../components/common/Paging/Paging";
import { withRouter } from "react-router-dom";

const PagingContainer = ({ history, location }) => {
  const { posts, error, loading } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading["posts/LIST_POSTS"],
  }));

  // page 버튼 클릭 시, 기존 url + page 추가
  const setPage = useCallback(
    (page) => {
      const {
        username,
        tag,
        limit = 15,
      } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const query = qs.stringify({ username, tag, page, limit });
      history.push(location.pathname + `?${query}`);
    },
    [history, location.pathname, location.search]
  );

  return (
    <Paging
      posts={posts}
      error={error}
      loading={loading}
      onChangePage={setPage}
    />
  );
};

export default withRouter(PagingContainer);
