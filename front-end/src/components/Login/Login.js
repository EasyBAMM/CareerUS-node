import React from "react";
import styles from "./Login.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Login = ({ form, onChange, onSubmit, error }) => {
  return (
    <div className={cx("login-container")}>
      <div className={cx("login-box")}>
        <header>
          <h1>
            <Link to="/login">CareerUS</Link>
          </h1>
        </header>
        <main>
          <div id="content">
            <form onSubmit={onSubmit}>
              <h3 className="hide">로그인</h3>
              <div className={cx("input-wrap")}>
                <span className={cx("input-box")}>
                  <input
                    type="text"
                    className={cx("int")}
                    name="username"
                    placeholder="아이디"
                    autoComplete="off"
                    onChange={onChange}
                    value={form.username}
                    required={true}
                  />
                </span>
              </div>
              <div className={cx("input-wrap")}>
                <span className={cx("input-box")}>
                  <input
                    type="password"
                    className={cx("int")}
                    name="password"
                    placeholder="비밀번호"
                    autoComplete="off"
                    onChange={onChange}
                    value={form.password}
                    required={true}
                  />
                </span>
              </div>
              {error && (
                <div className={cx("login-error-message")}>{error}</div>
              )}
              <button className={cx("login-button")}>로그인</button>
            </form>
            <div className={cx("login-info")}>
              <Link to="/register">회원가입</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
