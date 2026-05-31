import {
  Login,
  Register,
  ResetPassInFormation,
  ResetPassword,
} from "@/components/organisms/auth";
import { AuthLayout } from "../../templates";
import NewPassword from "@/components/organisms/auth/ResetPassword/NewPassword";

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
        children: [
          {
            path: "/Auth/ResetPassword/ResetPassInFormation",
            element: <ResetPassInFormation />,
          },
          {
            path: "/Auth/ResetPassword/NewPassword/:veriFyCode",
            element: <NewPassword />,
          },
        ],
      },
    ],
  },
];
export default authRoute;
