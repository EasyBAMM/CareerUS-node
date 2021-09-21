import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";
import PostListContainer from "../containers/Posts/PostListContainer";
import SearchBarContainer from "../containers/common/SearchBar/SearchBarContainer";
import PostsPagingContainer from "../containers/common/Paging/PostsPagingContainer";

const PostListPage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <PostListContainer />
      <PostsPagingContainer />
      <SearchBarContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default PostListPage;
