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
// import PostListPage from "./pages/PostListPage";
// import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <>
      <Switch>
        <Route component={LoginPage} path="/" exact={true} />
        <Route component={LoginPage} path="/login" exact={true} />
        <Route component={RegisterPage} path="/register" exact={true} />
        <PrivateRoute component={MainPage} path="/main" />
        <PrivateRoute component={WritePage} path="/write" />
        <PrivateRoute component={PostPage} path={"/board/view"} />
        <PrivateRoute component={PostListPage} path={"/board/lists"} />
        <Route component={NotFoundPage} />
        {/* <Route component={PostListPage} path="/@:username" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" /> */}
      </Switch>
    </>
  );
};

export default App;
