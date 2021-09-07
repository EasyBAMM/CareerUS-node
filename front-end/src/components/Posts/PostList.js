import React from "react";
import styles from "./PostList.scss";
import classNames from "classnames/bind";
import PostHead from "../common/PostHead/PostHead";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const datePrint = (publishedDate) => {
  const now = new Date(); // defaults to now
  const postDate = new Date(publishedDate);
  if (now.toLocaleDateString() === postDate.toLocaleDateString()) {
    return postDate.getHours() + ":" + postDate.getMinutes();
  } else {
    return postDate.toLocaleDateString();
  }
};

const PostItem = ({ post }) => {
  // const { publishedDate, user, tags, title, body, _id } = post;
  const { seq, title, user, publishedDate, _id, views } = post;
  return (
    <tr>
      <td>{seq}</td>
      <td>
        <Link to={`/board/view/?username=${user.username}&postId=${_id}`}>
          {title}
        </Link>
      </td>
      <td>
        <Link to={`/board/lists/?username=${user.username}`}>{user.name}</Link>
      </td>
      <td>{datePrint(publishedDate)}</td>
      <td>{views}</td>
    </tr>
  );
};

const PostListBlock = ({ category, children, limit, onChangeSelect }) => {
  return (
    <PostHead category={category}>
      <div className={cx("post-list")}>
        <div className={cx("list-style")}>
          <select value={limit} onChange={onChangeSelect}>
            <option value="5">5개씩</option>
            <option value="15">15개씩</option>
            <option value="30">30개씩</option>
          </select>
        </div>
        <div className={cx("list-content")}>
          <table className={cx("list-infos")}>
            <thead>
              <tr>
                <th></th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            {/* <PostItem /> */}
            {children}
          </table>
          <div className={cx("post-btn")}>
            <Link to="/write">
              <RiEdit2Fill />
              글쓰기
            </Link>
          </div>
        </div>
      </div>
    </PostHead>
  );
};

const PostList = ({
  posts,
  loading,
  error,
  showWriteButton,
  limit,
  onChangeSelect,
}) => {
  const category = "게시판";
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostHead category={category}>등록된 게시글이 없습니다.</PostHead>;
    }
    return <PostHead category={category}>에러가 발생했습니다.</PostHead>;
  }

  return (
    <PostListBlock
      category={category}
      limit={limit}
      onChangeSelect={onChangeSelect}
    >
      {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여 줌 */}
      {!loading && posts && (
        <tbody>
          {posts.posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </tbody>
      )}
      {/* <PostItem />
      <PostItem />
      <PostItem /> */}
    </PostListBlock>
  );
};

export default PostList;
