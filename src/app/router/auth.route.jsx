import { Login, Register } from "@/components/organisms/auth";
import { AuthLayout } from "../../templates";

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
    ],
  },
];
export default authRoute;
