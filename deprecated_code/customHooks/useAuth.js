import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { signOutUserSuccess } from "store/user/userSlice";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const dispatch = useDispatch();
  const { domain } = useSelector((state) => state?.user?.currentUser) || {};
  const { company_domain } = useParams();
  let logoutCondition = false;
  if (process.env.NODE_ENV !== "development") {
    logoutCondition = domain !== company_domain;
  }
  const { currentUser } = useSelector(mapState);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(signOutUserSuccess());
  };

  if (logoutCondition) {
    logoutHandler();
  }

  useEffect(() => {
    if (!currentUser) {
      return navigate(`/${company_domain}/login`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
