const useStoreUserToDB = () => {
  return ({ name, email, image }) => {
    fetch("https://achieve-flow-server.vercel.app/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, email, image })
    })
      .then((res) => res.json())
      .then((data) => {
        //user saved to database successfully
        //TODO: show a toast
        console.log(data);
      });
  };
};

export default useStoreUserToDB;
