import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase";
import PropTypes from "prop-types";
import Loading from "./loading";

const PublicRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  return loading ? <Loading /> : user ? <Navigate to="/client" replace /> : children;
};

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  return loading ? <Loading /> : user ? children : <Navigate to="/signin" replace />;
};

PublicRoute.propTypes = {
  children: PropTypes.node,
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export { PublicRoute, PrivateRoute };
