import React, { useEffect } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import PostViewer from "../../components/Post/PostViewer";
import { readPost, unloadPost } from "../../modules/post";
import PostActionButtons from "../../components/Post/PostActionButtons";
import { setOriginalPost } from "../../modules/write";
import { removePost } from "../../lib/api/posts";

const PostViewerContainer = ({ location, history }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  // const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading["post/READ_POST"],
      user: user.user,
    })
  );

  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  // 글 수정
  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push("/write");
  };

  // 글 삭제
  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push("/board/lists"); // 홈으로 이동
      alert("작성글이 삭제되었습니다.");
    } catch (e) {
      console.log(e);
    }
  };

  // 글 작성자 확인
  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default withRouter(PostViewerContainer);
