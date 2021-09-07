import React from "react";
import PageTemplate from "../components/common/PageTemplate/PageTemplate";
import HeaderContainer from "../containers/common/Header/HeaderContainer";
import MainContainer from "../containers/Main/MainContainer";
import FooterContainer from "../containers/common/Footer/FooterContainer";

const MainPage = () => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <MainContainer />
      <FooterContainer />
    </PageTemplate>
  );
};

export default MainPage;
