import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";
import PostViewerContainer from "../containers/Post/PostViewerContainer";
import CommentsContainer from "../containers/common/Comments/CommentsContainer";
import CommentsPagingContainer from "../containers/common/Paging/CommentsPagingContainer";

const PostPage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <PostViewerContainer />
      <CommentsContainer />
      <CommentsPagingContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default PostPage;
