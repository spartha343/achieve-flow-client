import useGetUserDataFromDB from "../../../hooks/getUserDataFromDB/useGetUserDataFromDB";
import useSignOut from "../../../hooks/signOut/useSignOut";

const Profile = () => {
  const user = useGetUserDataFromDB() ?? {};
  const signOut = useSignOut();
  const { email, image, name } = user;
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="avatar">
          <div className="rounded-xl">
            <img src={image} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <h2 className="text-2xl">{email}</h2>
        </div>
      </div>
      <button type="button" className="btn mt-3" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
