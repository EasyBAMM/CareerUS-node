import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";
import ProfileListContainer from "../containers/Profiles/ProfileListContainer";
import ProfilesPagingContainer from "../containers/common/Paging/ProfilesPagingContainer";

const ProfileListPage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <ProfileListContainer />
      <ProfilesPagingContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default ProfileListPage;
