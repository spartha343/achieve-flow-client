import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthInfo from "../../../hooks/authInfo/useAuthInfo";
import useGoogleSignIn from "../../../hooks/googleSignIn/useGoogleSignIn";

const SignIn = () => {
  const { signInWithEmailAndPass } = useAuthInfo();
  const googleSignIn = useGoogleSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPass(email, password)
      .then((result) => {
        navigate(from, { replace: true });
        console.log(result.user);
      })
      .catch((error) => console.log(error.code, error.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign In now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignIn} className="card-body">
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
                <Link to="/sign-up" className="link">
                  Don&apos;t have an account? Sign Up
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign In"
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

export default SignIn;
