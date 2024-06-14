import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuthInfo from "../../hooks/authInfo/useAuthInfo";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useAuthInfo();
  if (isLoading) {
    return <Loading />;
  } else if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
