import React from "react";
import styles from "./Paging.scss";
import classNames from "classnames/bind";
import Pagination from "react-js-pagination";

const cx = classNames.bind(styles);

const Paging = ({ posts, error, loading, onChangePage }) => {
  // 에러 발생 시
  if (error) {
    return (
      <div className={cx("paging-container")}>
        <div className={cx("paging-content")}>{error}</div>
      </div>
    );
  }

  return (
    <div className={cx("paging-container")}>
      <div className={cx("paging-content")}>
        {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여 줌 */}

        {!loading && posts && (
          <div className={cx("paging-wrapper")}>
            {posts.count > 0 ? (
              <Pagination
                activePage={posts.currentPage}
                itemsCountPerPage={posts.limit}
                totalItemsCount={posts.count}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Paging;
