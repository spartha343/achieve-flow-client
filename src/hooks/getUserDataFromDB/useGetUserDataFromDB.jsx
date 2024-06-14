import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "../authInfo/useAuthInfo";

const useGetUserDataFromDB = () => {
  const {
    user: { email }
  } = useAuthInfo();

  const { data } = useQuery({
    queryKey: ["userDataFromDB", email],
    queryFn: () =>
      fetch(`http://localhost:5000/api/v1/users/${email}`).then((res) =>
        res.json()
      )
  });
  return data;
};

export default useGetUserDataFromDB;
