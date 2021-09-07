import React from "react";
import styles from "./Register.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Register = ({ form, onBlur, onChange, onSubmit, inputError, error }) => {
  return (
    <div className={cx("register-container")}>
      <div className={cx("register-box")}>
        <header>
          <h1>
            <Link to="/login">CareerUS</Link>
          </h1>
        </header>
        <main>
          <div id="content">
            <form onSubmit={onSubmit}>
              <h3 className="hide">회원가입</h3>
              {/* 아이디, 비밀번호, 가입코드 그룹 */}
              <div className={cx("row-group")}>
                {/* 아이디 입력 */}
                <div className={cx("join-row")}>
                  <h3 className={cx("join-title")}>아이디</h3>
                  <div className={cx("input-wrap")}>
                    <span className={cx("input-box")}>
                      <input
                        type="text"
                        className={cx("int")}
                        name="username"
                        placeholder="아이디"
                        autoComplete="off"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={form.username}
                        required={true}
                      />
                    </span>
                  </div>
                  {inputError.username && (
                    <span className={cx("error-next-box")}>
                      {inputError.username}
                    </span>
                  )}
                </div>
                {/* 비밀번호 입력 */}
                <div className={cx("join-row")}>
                  <h3 className={cx("join-title")}>비밀번호</h3>
                  <div className={cx("input-wrap")}>
                    <span className={cx("input-box")}>
                      <input
                        type="password"
                        className={cx("int")}
                        name="password"
                        placeholder="비밀번호"
                        autoComplete="off"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={form.password}
                        required={true}
                      />
                    </span>
                    <span className={cx("input-pw")}></span>
                  </div>
                  {inputError.password && (
                    <span className={cx("error-next-box")}>
                      {inputError.password}
                    </span>
                  )}

                  {/* 비밀번호 재확인 입력 */}
                  <h3 className={cx("join-title")}>비밀번호 재확인</h3>
                  <div className={cx("input-wrap")}>
                    <span className={cx("input-box")}>
                      <input
                        type="password"
                        className={cx("int")}
                        name="passwordConfirm"
                        placeholder="비밀번호 재확인"
                        autoComplete="off"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={form.passwordConfirm}
                        required={true}
                      />
                    </span>
                    <span className={cx("input-pw")}></span>
                  </div>
                  {inputError.passwordConfirm && (
                    <span className={cx("error-next-box")}>
                      {inputError.passwordConfirm}
                    </span>
                  )}
                </div>
                {/* 가입코드 입력 */}
                <div className={cx("join-row")}>
                  <h3 className={cx("join-title")}>가입코드</h3>
                  <div className={cx("input-wrap")}>
                    <span className={cx("input-box")}>
                      <input
                        type="text"
                        className={cx("int")}
                        name="registerCode"
                        placeholder="가입코드"
                        autoComplete="off"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={form.registerCode}
                        required={true}
                      />
                    </span>
                    <span className={cx("input-pw")}></span>
                  </div>
                  {inputError.registerCode && (
                    <span className={cx("error-next-box")}>
                      {inputError.registerCode}
                    </span>
                  )}
                </div>
              </div>
              {/* 유저정보 그룹 */}
              <div className={cx("row-group")}>
                {/* 이름 입력 */}
                <div className={cx("join-row")}>
                  <h3 className={cx("join-title")}>이름</h3>
                  <div className={cx("input-wrap")}>
                    <span className={cx("input-box")}>
                      <input
                        type="text"
                        className={cx("int")}
                        name="name"
                        placeholder="이름"
                        autoComplete="off"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={form.name}
                        required={true}
                      />
                    </span>
                    <span className={cx("input-pw")}></span>
                  </div>
                  {inputError.name && (
                    <span className={cx("error-next-box")}>
                      {inputError.name}
                    </span>
                  )}
                </div>
                {/* 소개글 입력 */}
                <div className={cx("join-row")}>
                  <h3 className={cx("join-title")}>소개글</h3>
                  <div className={cx("input-wrap")}>
                    <span className={cx("input-box")}>
                      <input
                        type="text"
                        className={cx("int")}
                        name="comment"
                        placeholder="행복하게 여행하려면 가볍게 여행해야 한다."
                        autoComplete="off"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={form.comment}
                        required={true}
                      />
                    </span>
                    <span className={cx("input-pw")}></span>
                  </div>
                  {inputError.comment && (
                    <span className={cx("error-next-box")}>
                      {inputError.comment}
                    </span>
                  )}
                </div>
              </div>
              {error && <span className={cx("error-next-box")}>{error}</span>}
              <button className={cx("login-button")}>가입하기</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
