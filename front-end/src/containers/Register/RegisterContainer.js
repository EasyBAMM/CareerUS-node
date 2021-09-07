import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Register from "../../components/Register/Register";
import { changeField, initializeForm, register } from "../../modules/auth";
// import { check } from "../../modules/user";
import { withRouter } from "react-router";

const RegisterContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState({
    username: null,
    password: null,
    passwordConfirm: null,
    registerCode: null,
    name: null,
    comment: null,
  });
  const dispatch = useDispatch();
  const { form, authRegister, authRegisterError } = useSelector(({ auth }) => ({
    form: auth.register,
    authRegister: auth.authRegister,
    authRegisterError: auth.authRegisterError,
    // user: user.user,
  }));

  // input 입력 요소 검사
  const onBlur = useCallback(
    (e) => {
      const { value, name } = e.target;

      let inputWrong = "";
      if (value === "") {
        inputWrong = "필수 정보입니다.";
      } else {
        if (name === "username") {
          const idRegExp = /^[a-zA-z0-9_-]{5,20}$/;
          if (!idRegExp.test(value)) {
            inputWrong =
              "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
          }
        } else if (name === "password") {
          const idRegExp = /^[a-zA-z0-9|\S]{8,16}$/;
          if (!idRegExp.test(value)) {
            inputWrong =
              "8~16자 영문 대 소문자, 숫자, 특수문자(공백 제외)를 사용하세요.";
          }
        } else if (name === "passwordConfirm") {
          const { password, passwordConfirm } = form;
          if (password !== passwordConfirm) {
            inputWrong = "비밀번호가 일치하지 않습니다.";
          }
        } else if (name === "name") {
          const idRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z]{1,}$/;
          if (!idRegExp.test(value)) {
            inputWrong =
              "한글과 영문 대 소문자를 사용하세요. (숫자, 특수기호, 공백 사용 불가)";
          }
        } else if (name === "comment") {
          const idRegExp =
            /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z0-9|\s!@#$%^&*-=+]{2,40}$/;
          if (!idRegExp.test(value)) {
            inputWrong =
              "2~40자의 한글과 영문, 숫자와 특수기호(!@#$%*+=-)만 사용 가능합니다.";
          }
        }
      }

      setInputError((prevState) => ({
        ...prevState,
        [name]: inputWrong,
      }));
    },
    [form]
  );

  // input 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  // form submit 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, registerCode, name, comment } =
      form;

    // 입력이 하나라도 이상하다면
    const inputCheck = Object.values(inputError);
    for (let i = 0; i < inputCheck.length; i++) {
      if (inputCheck[i] !== "") {
        setError("입력을 확인하세요.");
        return;
      }
    }

    // 하나라도 입력 비어 있다면
    if (
      [
        username,
        password,
        passwordConfirm,
        registerCode,
        name,
        comment,
      ].includes("")
    ) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      // TODO: 오류 처리
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ form: "register", key: "password", value: "" }));
      dispatch(
        changeField({ form: "register", key: "passwordConfirm", value: "" })
      );
      return;
    }
    console.log("회원가입 시도");
    dispatch(
      register({
        username,
        password,
        passwordConfirm,
        registerCode,
        name,
        comment,
      })
    );
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authRegisterError) {
      console.log("오류 발생");
      console.log(authRegisterError);
      if (authRegisterError.response.data.message) {
        // setError("이미 존재하는 계정명입니다.");
        setError(authRegisterError.response.data.message);
        return;
      }
      // 기타 이유
      setError("회원가입 실패");
      return;
    }

    if (authRegister) {
      console.log("회원가입 성공");
      console.log(authRegisterError);
      history.push("/login");
      // dispatch(check());
    }
  }, [authRegister, authRegisterError, history, dispatch]);

  return (
    <Register
      form={form}
      onBlur={onBlur}
      onChange={onChange}
      onSubmit={onSubmit}
      inputError={inputError}
      error={error}
    />
  );
};

export default withRouter(RegisterContainer);
