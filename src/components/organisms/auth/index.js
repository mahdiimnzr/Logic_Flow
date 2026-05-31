import { lazy } from "react";

export const Login = lazy(() => import("./Login"));
export const Register = lazy(() => import("./Register"));
export const ResetPassword = lazy(() => import("./ResetPassword"));
export const ResetPassInFormation = lazy(
  () => import("./ResetPassword/ResetPassInFormation"),
);
