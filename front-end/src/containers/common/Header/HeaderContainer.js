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

  return <Header user={user} onLogout={onLogout} />;
};

export default withRouter(HeaderContainer);
