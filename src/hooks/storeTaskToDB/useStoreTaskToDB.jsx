import useGetUserDataFromDB from "../getUserDataFromDB/useGetUserDataFromDB";

const useStoreTaskToDB = () => {
  const { _id } = useGetUserDataFromDB() ?? {};
  return async (formData) => {
    formData.user = _id;
    fetch("http://localhost:5000/api/v1/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  };
};

export default useStoreTaskToDB;
