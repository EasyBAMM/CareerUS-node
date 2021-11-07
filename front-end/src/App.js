import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
const App = () => {
  const RegisterPage = lazy(() => import("./pages/RegisterPage"));
  const MainPage = lazy(() => import("./pages/MainPage"));
  const PostPage = lazy(() => import("./pages/PostPage"));
  const PostListPage = lazy(() => import("./pages/PostListPage"));
  const WritePage = lazy(() => import("./pages/WritePage"));
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
          <PrivateRoute component={PostPage} path="/board/view" />
          <PrivateRoute component={WritePage} path="/board/write" />
          <PrivateRoute component={PostListPage} path="/board/lists" />
          <PrivateRoute component={ProfilePage} path="/profile/view" />
          <PrivateRoute component={ProfileWritePage} path="/profile/write" />
          <PrivateRoute component={ProfileListPage} path="/profile/lists" />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
