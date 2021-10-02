import React from "react";
import styles from "./Paging.scss";
import classNames from "classnames/bind";
import Pagination from "react-js-pagination";

const cx = classNames.bind(styles);

const Paging = ({ lists, error, loading, onChangePage, isComments }) => {
  // 에러 발생 시
  if (error) {
    return null;
  }

  return (
    <div
      className={cx("paging-container", {
        "comments-paging-container": isComments,
      })}
    >
      <div
        className={cx("paging-content", {
          "comments-paging-content": isComments,
        })}
      >
        {/* 로딩 중이 아니고, 리스트 배열이 존재할 때만 보여 줌 */}

        {!loading && lists && (
          <div className={cx("paging-wrapper")}>
            {lists.count > 0 ? (
              <Pagination
                activePage={lists.currentPage}
                itemsCountPerPage={lists.limit}
                totalItemsCount={lists.count}
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

export default React.memo(Paging);
