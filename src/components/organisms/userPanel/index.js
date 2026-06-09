import { lazy } from "react";

export const Dashboard = lazy(() => import("./Dashboard"));
export const UserInformation = lazy(() => import("./UserInformation"));
export const AllInformation = lazy(
  () => import("./UserInformation/AllInformation"),
);
export const SocialNetworkInformation = lazy(
  () => import("./UserInformation/SocialNetworkInformation"),
);
export const LocationInformation = lazy(
  () => import("./UserInformation/LocationInformation"),
);
