import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";
import PostListContainer from "../containers/Posts/PostListContainer";
import PagingContainer from "../containers/common/Paging/PagingContainer";
import SearchBarContainer from "../containers/common/SearchBar/SearchBarContainer";

const PostListPage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <PostListContainer />
      <PagingContainer />
      <SearchBarContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default PostListPage;
