import React, { useCallback, useEffect, useState } from "react";
import qs from "qs";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/Posts/PostList";
import { listPosts, unloadListPosts } from "../../modules/posts";

const PostListContainer = ({ history, location }) => {
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading["posts/LIST_POSTS"],
      user: user.user,
    })
  );

  // select 버튼 클릭 시, 기존 url + page는 1로 초기화 + limit 추가
  const onChangeSelect = useCallback(
    (e) => {
      const { username, tag } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const query = qs.stringify({
        username,
        tag,
        page: 1,
        limit: e.target.value,
      });
      history.push(location.pathname + `?${query}`);
      setLimit(e.target.value);
    },
    [history, location.pathname, location.search]
  );

  // 포스트 목록 표시
  useEffect(() => {
    const {
      username,
      tag,
      page = 1,
      limit = 15,
    } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setLimit(limit); // limit 유지 및 초기화
    dispatch(listPosts({ tag, username, page, limit }));
    // 언마운트될 때 리덕스에서 리스트 데이터 없애기
    return () => {
      dispatch(unloadListPosts());
    };
  }, [dispatch, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
      limit={limit}
      onChangeSelect={onChangeSelect}
    />
  );
};

export default withRouter(PostListContainer);
