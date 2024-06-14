import { useQuery } from "@tanstack/react-query";
import useAuthInfo from "../authInfo/useAuthInfo";

const useGetUserDataFromDB = () => {
  const {
    user: { email }
  } = useAuthInfo();

  const { data } = useQuery({
    queryKey: ["userDataFromDB", email],
    queryFn: () =>
      fetch(
        `https://achieve-flow-server.vercel.app/api/v1/users/${email}`
      ).then((res) => res.json())
  });
  return data;
};

export default useGetUserDataFromDB;
