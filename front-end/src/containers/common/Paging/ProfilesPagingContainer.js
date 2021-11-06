import React, { useCallback } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import Paging from "../../../components/common/Paging/Paging";
import { withRouter } from "react-router-dom";

const ProfilesPagingContainer = ({ history, location }) => {
  const isComments = true;
  const { profiles, error, loading } = useSelector(({ profiles, loading }) => ({
    profiles: profiles.profiles,
    error: profiles.error,
    loading: loading["profiles/LIST_PROFILES"],
  }));

  // page 버튼 클릭 시, 기존 url + page 추가
  const setPage = useCallback(
    (page) => {
      const { keyword, limit = 15 } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const query = qs.stringify({
        keyword,
        page,
        limit,
      });
      history.push(location.pathname + `?${query}`);
    },
    [history, location.pathname, location.search]
  );

  return <Paging lists={profiles} error={error} loading={loading} onChangePage={setPage} isComments={isComments} />;
};

export default withRouter(ProfilesPagingContainer);
