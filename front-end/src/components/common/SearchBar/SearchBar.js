import React from "react";
import styles from "./SearchBar.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SearchBar = ({
  onChangeSearch,
  keyword,
  onChangeKeyword,
  onSearch,
  onEnterKeyPress,
}) => {
  return (
    <div className={cx("searchbar-container")}>
      <div className={cx("searchbar-content")}>
        <div className={cx("search-form")}>
          {/* <input type="hidden" name="page" value="1" />
          <input type="hidden" name="limit" value="15" /> */}
          <select name="search" onChange={onChangeSearch}>
            <option value="all">전체</option>
            <option value="title">제목</option>
            <option value="body">내용</option>
            <option value="name">작성자</option>
          </select>
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={onChangeKeyword}
            onKeyPress={onEnterKeyPress}
          />
          <input
            type="button"
            className={cx("search-btn")}
            value="검색"
            onClick={onSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
