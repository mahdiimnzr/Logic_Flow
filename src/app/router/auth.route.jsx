import { Login, Register } from "@/components/organisms/auth";
import { AuthLayout } from "../../templates";
import ResetPassword from "@/components/organisms/auth/ResetPassword";

const authRoute = [
  {
    path: "/Auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/Auth/Login",
        element: <Login />,
      },
      {
        path: "/Auth/Register",
        element: <Register />,
      },
      {
        path: "/Auth/ResetPassword",
        element: <ResetPassword />,
      },
    ],
  },
];
export default authRoute;
