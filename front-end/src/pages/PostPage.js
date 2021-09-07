import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";
import PostViewerContainer from "../containers/Post/PostViewerContainer";

const PostPage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <PostViewerContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default PostPage;
