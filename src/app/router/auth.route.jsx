import Login from "../../components/auth/Login";
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
    ],
  },
];
export default authRoute;
