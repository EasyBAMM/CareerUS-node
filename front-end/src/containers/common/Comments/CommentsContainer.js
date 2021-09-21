import React, { useCallback, useEffect, useState } from "react";
import qs from "qs";
import Comments from "../../../components/common/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listComments, unloadListComments } from "../../../modules/comments";

const CommentsContainer = ({ location, history }) => {
  const [orderBy, setOrderBy] = useState("asc");
  const dispatch = useDispatch();
  const { comments, error, loading, user } = useSelector(
    ({ comments, error, loading, user }) => ({
      comments: comments.comments,
      error: comments.error,
      loading: loading["comments/LIST_COMMENTS"],
      user: user.user,
    })
  );

  // select 버튼 클릭 시, 기존 url + page는 1로 초기화 + orderBy 추가
  const onChangeSelect = useCallback(
    (e) => {
      const { username, postId } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const query = qs.stringify({
        username,
        postId,
        page: 1,
        orderBy: e.target.value,
      });
      history.push(location.pathname + `?${query}`);
      setOrderBy(e.target.value);
    },
    [history, location.pathname, location.search]
  );

  // 댓글 표시
  useEffect(() => {
    const {
      postId,
      page = 1,
      orderBy = "asc",
    } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listComments({ id: postId, page, orderBy }));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadListComments());
    };
  }, [dispatch, location.search]);

  return (
    <Comments
      loading={loading}
      error={error}
      comments={comments}
      showWriteButton={user}
      orderBy={orderBy}
      onChangeSelect={onChangeSelect}
    />
  );
};

export default withRouter(CommentsContainer);
