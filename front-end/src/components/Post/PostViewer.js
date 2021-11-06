import React from "react";
import styles from "./PostViewer.scss";
import classNames from "classnames/bind";
import PostHead from "../common/PostHead/PostHead";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PostViewer = ({
  post,
  loading,
  error,
  actionButtons,
  comments,
  loadingComments,
}) => {
  const category = "게시판";
  const categoryLink = "board";
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <PostHead category={category}>존재하지 않는 포스트입니다.</PostHead>
      );
    }
    return <PostHead category={category}>잘못된 요청정보입니다.</PostHead>;
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return <PostHead category={category} categoryLink={categoryLink}>로딩 중입니다...</PostHead>;
  }
  const { title, body, user, publishedDate, tags, views } = post;
  return (
    <PostHead category={category} categoryLink={categoryLink} tags={tags}>
      <div className={cx("post-info")}>
        <h1 className={cx("post-title")}>{title}</h1>
        <div className={cx("post-subinfo")}>
          <div className={cx("post-subinfo-l")}>
            <span>
              <Link to={user ? `/profile/view?username=${user.username}&userId=${user._id}` : "#"}>
                {user.name}
              </Link>
            </span>
            <span>{new Date(publishedDate).toLocaleString()}</span>
          </div>
          <div className={cx("post-subinfo-r")}>
            <span>조회 {views}</span>
            <span>
              댓글 {!loadingComments && comments && <>{comments.count}</>}
            </span>
          </div>
        </div>
      </div>
      {actionButtons}
      <div
        className={cx("post-aritcle")}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      ></div>
    </PostHead>
  );
};

export default PostViewer;
