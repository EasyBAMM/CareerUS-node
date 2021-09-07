import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { changeField, initializeForm, login } from "../../modules/auth";
import Login from "../../components/Login/Login";
import { check } from "../../modules/user";

const LoginContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, authLogin, authLoginError, user } = useSelector(
    ({ auth, user }) => ({
      form: auth.login,
      authLogin: auth.authLogin,
      authLoginError: auth.authLoginError,
      user: user.user,
    })
  );

  // input 변경 이벤트 핸들러
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: "login",
          key: name,
          value,
        })
      );
    },
    [dispatch]
  );

  // form submit 이벤트 핸들러
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { username, password } = form;
      dispatch(login({ username, password }));
    },
    [dispatch, form]
  );

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  // 로그인 성공/실패 처리
  useEffect(() => {
    if (authLoginError) {
      console.log("오류 발생");
      console.log(authLoginError.response);
      setError(authLoginError.response.data.message);
      return;
    }
    if (authLogin) {
      console.log("로그인 입력 성공");
      try {
        localStorage.setItem("authLogin", JSON.stringify(authLogin));
      } catch (e) {
        console.log("authLogin: localStorage is not working");
      }

      dispatch(check());
    }
  }, [authLogin, authLoginError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      console.log("로그인 성공");
      history.push("/main"); // 메인 페이지로 이동
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("user: localStorage is not working");
      }
    }
  }, [history, user]);

  return (
    <Login form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default withRouter(LoginContainer);
