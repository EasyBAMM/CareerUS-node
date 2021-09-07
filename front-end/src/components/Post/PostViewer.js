import React from "react";
import styles from "./PostViewer.scss";
import classNames from "classnames/bind";
import PostHead from "../common/PostHead/PostHead";
import { Link } from "react-router-dom";
import Comments from "../common/Comments/Comments";

const cx = classNames.bind(styles);

const PostViewer = ({ post, error, loading, actionButtons }) => {
  const category = "게시판";
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <PostHead category={category}>존재하지 않는 포스트입니다.</PostHead>
      );
    }
    return <PostHead category={category}>오류 발생!</PostHead>;
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null;
  }
  const { title, body, user, publishedDate, tags, views } = post;
  return (
    <PostHead category={category} tags={tags}>
      <div className={cx("post-info")}>
        <h1 className={cx("post-title")}>{title}</h1>
        <div className={cx("post-subinfo")}>
          <div className={cx("post-subinfo-l")}>
            <span>
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
          </div>
          <div className={cx("post-subinfo-r")}>
            <span>조회 {views}</span>
            <span>댓글</span>
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
      <Comments />
    </PostHead>
  );
};

export default PostViewer;
