import React from "react";
import styles from "./ProfileList.scss";
import classNames from "classnames/bind";
import PostHead from "../common/PostHead/PostHead";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const ProfileItem = React.memo(({ profile })  => {
  const { _id, username, name, userjob, image, comment, views } = profile;
  return (
    <tr>
      <td></td>
      <td>
        <Link to={`/profile/view?username=${username}&userId=${_id}`}>
          <div className={cx("userimage-wrap")}>
            <img src={image ? image : "http://localhost:4000/images/default.png"} alt="userimage" />
          </div>
          <div className={cx("profile-title-string")}>
            <div className={cx("profile-title-name")}>{name}</div>
            <div className={cx("profile-title-comment")}>{comment}</div>
          </div>
        </Link>
      </td>
      <td>{userjob}</td>
      <td>{views}</td>
    </tr>
  );
});

const ProfileListBlock = React.memo(({
  category,
  categoryLink,
  children,
  limit,
  onChangeSelect,
  keyword,
  btnActive,
  onChangeKeyword,
  onSearch,
  onEnterKeyPress,
}) => {
  return (
    <PostHead category={category} categoryLink={categoryLink}>
      <div className={cx("profile-list")}>
        <div className={cx("list-style")}>
          <div className={cx("serach-wrap")}>
            <div className={cx("search")}>
              <AiOutlineSearch className={cx("search-btn", { "btn-active": btnActive })} onClick={onSearch} />
              <input type="text" name="keyword" placeholder="검색" value={keyword} onChange={onChangeKeyword} onKeyPress={onEnterKeyPress} />
            </div>
          </div>
          <div className={cx("select-wrap")}>
            <select value={limit} onChange={onChangeSelect}>
              <option value="5">5개씩</option>
              <option value="15">15개씩</option>
              <option value="30">30개씩</option>
            </select>
          </div>
        </div>
        <div className={cx("list-content")}>
          <table className={cx("list-infos")}>
            <thead>
              <tr>
                <th></th>
                <th>이름</th>
                <th>분야</th>
                <th>조회</th>
              </tr>
            </thead>
            {/* <ProfileItem /> */}
            {children}
          </table>
        </div>
      </div>
    </PostHead>
  );
});

const ProfileErrorItem = ({ children }) => {
  return (
    <tr>
      <td colSpan="4" className={cx("profile-nodata")}>
        <div>{children}</div>
      </td>
    </tr>
  );
};

const ProfileList = ({ profiles, loading, error, limit, onChangeSelect, keyword, btnActive, onChangeKeyword, onSearch, onEnterKeyPress }) => {
  const category = "인맺찾기";
  const categoryLink = "profile";
  // 에러 발생 시
  if (error) {
    let errMsg = "에러가 발생했습니다.";
    if (error.response && error.response.status === 404) {
      errMsg = "검색 결과가 없습니다.";
    }
    return (
      <ProfileListBlock
        category={category}
        categoryLink={categoryLink}
        limit={limit}
        onChangeSelect={onChangeSelect}
        keyword={keyword}
        btnActive={btnActive}
        onChangeKeyword={onChangeKeyword}
        onSearch={onSearch}
        onEnterKeyPress={onEnterKeyPress}
      >
        <ProfileErrorItem>{errMsg}</ProfileErrorItem>
      </ProfileListBlock>
    );
  }
  return (
    <ProfileListBlock
      category={category}
      categoryLink={categoryLink}
      limit={limit}
      onChangeSelect={onChangeSelect}
      keyword={keyword}
      btnActive={btnActive}
      onChangeKeyword={onChangeKeyword}
      onSearch={onSearch}
      onEnterKeyPress={onEnterKeyPress}
    >
      {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여 줌 */}
      {!loading && profiles && (
        <tbody>
          {profiles.count > 0 ? (
            profiles.profiles.map((profile) => <ProfileItem profile={profile} key={profile._id} />)
          ) : (
            <ProfileErrorItem>검색 결과가 없습니다.</ProfileErrorItem>
          )}
        </tbody>
      )}
    </ProfileListBlock>
  );
};

export default ProfileList;
