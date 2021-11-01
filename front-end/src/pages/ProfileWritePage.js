import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import ProfileWriteContainer from "../containers/Profile/ProfileWriteContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";

const ProfileWritePage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <ProfileWriteContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default ProfileWritePage;
