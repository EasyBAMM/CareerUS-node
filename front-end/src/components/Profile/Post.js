import React from "react";
import styles from "./Post.scss";
import classNames from "classnames/bind";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PostItem = ({ post, datePrint }) => {
  // const { publishedDate, user, tags, title, body, _id } = post;
  const { seq, title, user, publishedDate, _id, views } = post;
  return (
    <tr>
      <td>{seq}</td>
      <td>
        <Link to={`/board/view?username=${user.username}&postId=${_id}`}>
          <div className={cx("post-title-string")}>{title}</div>
        </Link>
        <div className={cx("post-mobile-content")}>
          <span>{user.username}</span>
          <span>|</span>
          <span>{datePrint(publishedDate)}</span>
          <span>|</span>
          <span>조회 {views}</span>
          <span>|</span>
          <span>댓글 3</span>
        </div>
      </td>
      <td>{datePrint(publishedDate)}</td>
      <td>{views}</td>
    </tr>
  );
};

const PostListBlock = ({ children, showWriteButton }) => {
  return (
    <div className={cx("post-list")}>
      <div className={cx("list-content")}>
        <table className={cx("list-infos")}>
          <thead>
            <tr>
              <th></th>
              <th>제목</th>
              <th>작성일</th>
              <th>조회</th>
            </tr>
          </thead>
          {/* <PostItem /> */}
          {children}
        </table>
      </div>
      <div className={cx("post-btn")}>
        {showWriteButton && (
          <Link to="/write">
            <RiEdit2Fill />
            글쓰기
          </Link>
        )}
      </div>
    </div>
  );
};

const PostErrorItem = ({ children }) => {
  return (
    <tr>
      <td colSpan="4">
        <div className={cx("post-nodata")}>{children}</div>
      </td>
    </tr>
  );
};

const PostList = ({ posts, loading, error, showWriteButton, datePrint }) => {
  // 에러 발생 시
  if (error) {
    let errMsg = "에러가 발생했습니다.";
    if (error.response && error.response.status === 404) {
      errMsg = "등록된 게시글이 없습니다.";
    }
    return (
      <PostListBlock showWriteButton={showWriteButton}>
        <PostErrorItem>{errMsg}</PostErrorItem>
      </PostListBlock>
    );
  }
  return (
    <PostListBlock showWriteButton={showWriteButton}>
      {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여 줌 */}
      {!loading && posts && (
        <tbody>
          {posts.count > 0 ? (
            posts.posts.map((post) => (
              <PostItem post={post} key={post._id} datePrint={datePrint} />
            ))
          ) : (
            <PostErrorItem>등록된 게시글이 없습니다.</PostErrorItem>
          )}
        </tbody>
      )}
      {/* <PostItem />
        <PostItem />
        <PostItem /> */}
    </PostListBlock>
  );
};

export default PostList;
