import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../../../components/common/Header/Header";
import { logout } from "../../../modules/user";

const HeaderContainer = ({ history }) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const [active, setActive] = useState(false);
  const onActive = () => {
    setActive((active) => !active);
  };

  return (
    <Header
      user={user}
      onLogout={onLogout}
      onActive={onActive}
      active={active}
    />
  );
};

export default withRouter(HeaderContainer);
