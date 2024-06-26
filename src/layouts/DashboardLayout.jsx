import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <>
      <div className="lg:hidden">
        <Navbar />
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content relative">
            {/* Sidebar content here */}
            <>
              <li>
                <NavLink to="/dashboard/profile">User Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-tasks">My Tasks</NavLink>
              </li>
              <li className="absolute bottom-3 w-11/12">
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
