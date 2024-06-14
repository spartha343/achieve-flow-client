import { useNavigate } from "react-router-dom";
import useAuthInfo from "../authInfo/useAuthInfo";

const useSignOut = () => {
  const navigate = useNavigate();
  const { signTheUserOut } = useAuthInfo();
  return () => {
    signTheUserOut()
      .then(() => {
        navigate("/");
        //TODO: Show an alert
      })
      .catch((error) => {
        //TODO: Handle error message
        console.log(error.code, error.message);
      });
  };
};

export default useSignOut;
