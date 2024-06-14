import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import SignUp from "../pages/authentication/signUp/SignUp";
import SignIn from "../pages/authentication/signIn/SignIn";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Profile from "../pages/dashboard/profile/Profile";
import MyTasks from "../pages/dashboard/myTasks/MyTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/sign-in",
        element: <SignIn />
      }
    ]
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile />
      },
      {
        path: "/dashboard/my-tasks",
        element: <MyTasks />
      }
    ]
  }
]);

export default router;
