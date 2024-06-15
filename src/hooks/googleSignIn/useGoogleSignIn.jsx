import { useLocation, useNavigate } from "react-router-dom";
import useAuthInfo from "../authInfo/useAuthInfo";
import useStoreUserToDB from "../storeUserToDB.jsx/useStoreUserToDB";

const useGoogleSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { googleSignInWithPopUp } = useAuthInfo();
  const storeUserToDB = useStoreUserToDB();
  return () => {
    googleSignInWithPopUp()
      .then((result) => {
        console.log(result);
        navigate(from, { replace: true });
        const { displayName, email, photoURL } = result.user;
        storeUserToDB({ name: displayName, email, image: photoURL });
      })
      .catch((error) => {
        //TODO: handle Error
        console.log(error.code, error.message);
      });
  };
};

export default useGoogleSignIn;
