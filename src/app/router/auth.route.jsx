import Login from "../../components/organisms/auth/Login";
import Register from "../../components/organisms/auth/Register";
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
