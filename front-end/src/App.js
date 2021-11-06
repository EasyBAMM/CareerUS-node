import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./pages/PrivateRoute";
// import MainPage from "./pages/MainPage";
// import PostPage from "./pages/PostPage";
// import WritePage from "./pages/WritePage";
// import PostListPage from "./pages/PostListPage";
// import ProfilePage from "./pages/ProfilePage";
// import ProfileWritePage from "./pages/ProfileWritePage";
// import ProfileListPage from "./pages/ProfileListPage";
// import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const RegisterPage = lazy(() => import("./pages/RegisterPage"));
  const MainPage = lazy(() => import("./pages/MainPage"));
  const PostPage = lazy(() => import("./pages/PostPage"));
  const WritePage = lazy(() => import("./pages/MainPage"));
  const PostListPage = lazy(() => import("./pages/PostListPage"));
  const ProfilePage = lazy(() => import("./pages/ProfilePage"));
  const ProfileWritePage = lazy(() => import("./pages/ProfileWritePage"));
  const ProfileListPage = lazy(() => import("./pages/ProfileListPage"));
  const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

  return (
    <>
      <Suspense fallback={<div>loding...</div>}>
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
          <PrivateRoute component={ProfileListPage} path={"/profile/lists"} />
          <Route component={NotFoundPage} />
          {/* <Route component={PostListPage} path="/@:username" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" /> */}
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
