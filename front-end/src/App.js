import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./pages/PrivateRoute";
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostPage from "./pages/PostPage";
import PostListPage from "./pages/PostListPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileWritePage from "./pages/ProfileWritePage";

const App = () => {
  return (
    <>
      <Switch>
        <Route component={LoginPage} path="/" exact={true} />
        <Route component={LoginPage} path="/login" exact={true} />
        <Route component={RegisterPage} path="/register" exact={true} />
        <PrivateRoute component={MainPage} path="/main" />
        <PrivateRoute component={PostPage} path={"/board/view"} />
        <PrivateRoute component={WritePage} path="/board/write" />
        <PrivateRoute component={PostListPage} path={"/board/lists"} />
        <PrivateRoute component={ProfilePage} path={"/profile/view"} />
        <PrivateRoute component={ProfileWritePage} path={"/profile/write"} />
        <Route component={NotFoundPage} />
        {/* <Route component={PostListPage} path="/@:username" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" /> */}
      </Switch>
    </>
  );
};

export default App;
