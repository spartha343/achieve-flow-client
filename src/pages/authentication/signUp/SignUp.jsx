import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthInfo from "../../../hooks/authInfo/useAuthInfo";
import useGoogleSignIn from "../../../hooks/googleSignIn/useGoogleSignIn";
import useHostImage from "../../../hooks/hostImage/useHostImage";
import useStoreUserToDB from "../../../hooks/storeUserToDB.jsx/useStoreUserToDB";

const SignUp = () => {
  const { signUpWithEmailAndPass } = useAuthInfo();
  const googleSignIn = useGoogleSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const hostImage = useHostImage();
  const storeUserToDB = useStoreUserToDB();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const fileField = form.image;
    const formData = new FormData();
    formData.append("image", fileField.files[0]);
    const image = await hostImage(formData);

    signUpWithEmailAndPass(email, password)
      .then((result) => {
        navigate(from, { replace: true });
        const { displayName, email } = result.user;
        storeUserToDB({ name: displayName || name, email, image });
      })
      .catch((error) => {
        //TODO: handle error properly
        console.log(error.code, error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link to="/sign-in" className="link">
                  Already have an account? Sign In
                </Link>
              </label>
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Choose Your photo</span>
              </div>
              <input
                name="image"
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                required
              />
            </label>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div>
            <div className="divider"></div>
            <button
              type="button"
              onClick={googleSignIn}
              className="btn btn-outline"
            >
              Google Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
