import { Link } from "react-router-dom";

const ImageWithTextOverlay = () => {
  return (
    <div
      className="hero min-h-[70vh]"
      style={{
        backgroundImage: `url(https://projectsly.com/images/task-management-system-screenshot-1.png?v=1691124479409199525)`
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Achieve Flow</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to="/dashboard/profile">
            <button className="btn">Let’s Explore</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageWithTextOverlay;
