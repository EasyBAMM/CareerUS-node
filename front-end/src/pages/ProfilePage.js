import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";
import ProfileContainer from "../containers/Profile/ProfileContainer";
const ProfilePage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <ProfileContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default ProfilePage;
