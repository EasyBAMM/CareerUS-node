import React, { useCallback, useEffect, useState } from "react";
import qs from "qs";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ProfileList from "../../components/Profiles/ProfileList";
import { listProfiles, unloadListProfiles } from "../../modules/profiles";

const ProfileListContainer = ({ history, location }) => {
  const [limit, setLimit] = useState(15);

  const [keyword, setKeyword] = useState("");
  const [btnActive, setBtnActive] = useState(false); // 검색 버튼
  const onChangeKeyword = (e) => {
    if (e.target.value.length > 1) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
    setKeyword(e.target.value);
  };

  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  // 검색 버튼 클릭 시, 기존 url + keyword 추가
  const onSearch = useCallback(
    (e) => {
      if (keyword.length < 2) {
        alert("두 글자이상으로 검색해주세요.");
        return;
      }
      const query = qs.stringify({
        keyword,
      });
      history.push(location.pathname + `?${query}`);
    },
    [history, location.pathname, keyword]
  );

  // 검색 창 초기화
  useEffect(() => {
    const { keyword = "" } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setKeyword(keyword); // keyword 유지 및 초기화
  }, [location.search]);

  const dispatch = useDispatch();
  const { profiles, error, loading } = useSelector(({ profiles, loading }) => ({
    profiles: profiles.profiles,
    error: profiles.error,
    loading: loading["profiles/LIST_PROFILES"],
  }));

  // select 버튼 클릭 시, 기존 url + page는 1로 초기화 + limit 추가
  const onChangeSelect = useCallback(
    (e) => {
      const { keyword } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const query = qs.stringify({
        keyword,
        page: 1,
        limit: e.target.value,
      });
      history.push(location.pathname + `?${query}`);
      setLimit(e.target.value);
    },
    [history, location.pathname, location.search]
  );

  // 프로필 목록 표시
  useEffect(() => {
    const {
      keyword,
      page = 1,
      limit = 15,
    } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setLimit(limit); // limit 유지 및 초기화
    dispatch(listProfiles({ keyword, page, limit }));
    document.getElementById("root").scrollTo(0, 0); // 페이지 이동 후 스크롤 탑
    // 언마운트될 때 리덕스에서 리스트 데이터 없애기
    return () => {
      dispatch(unloadListProfiles());
    };
  }, [dispatch, location.search]);

  return (
    <ProfileList
      loading={loading}
      error={error}
      profiles={profiles}
      limit={limit}
      onChangeSelect={onChangeSelect}
      keyword={keyword}
      btnActive={btnActive}
      onChangeKeyword={onChangeKeyword}
      onSearch={onSearch}
      onEnterKeyPress={onEnterKeyPress}
    />
  );
};

export default withRouter(ProfileListContainer);
