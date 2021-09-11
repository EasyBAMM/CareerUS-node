import React, { useCallback, useEffect, useState } from "react";
import qs from "qs";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import { withRouter } from "react-router";

const SearchBarContainer = ({ history, location }) => {
  const [search, setSearch] = useState("all");
  const [keyword, setKeyword] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  // 검색 버튼 클릭 시, 기존 url + search + keyword 추가
  const onSearch = useCallback(
    (e) => {
      if (keyword.length < 2) {
        alert("두 글자이상으로 검색해주세요.");
        return;
      }
      const query = qs.stringify({
        search,
        keyword,
      });
      history.push(location.pathname + `?${query}`);
    },
    [history, location.pathname, search, keyword]
  );

  // 검색 창 초기화
  useEffect(() => {
    const { search = "all", keyword = "" } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setSearch(search);
    setKeyword(keyword); // keyword 유지 및 초기화
  }, [location.search]);

  return (
    <SearchBar
      onChangeSearch={onChangeSearch}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
      onSearch={onSearch}
      onEnterKeyPress={onEnterKeyPress}
    />
  );
};

export default withRouter(SearchBarContainer);
