import { lazy } from "react";

export const Dashboard = lazy(() => import("./Dashboard"));
export const UserInformation = lazy(() => import("./UserInformation"));
export const MyCourses = lazy(() => import("./MyCourses"));
export const AllInformation = lazy(
  () => import("./UserInformation/AllInformation"),
);
export const SocialNetworkInformation = lazy(
  () => import("./UserInformation/SocialNetworkInformation"),
);
export const LocationInformation = lazy(
  () => import("./UserInformation/LocationInformation"),
);
export const SecuritySetting = lazy(() => import("./SecuritySetting"));
export const ReservedCourses = lazy(() => import("./ReservedCourses"));
export const MyPayments = lazy(() => import("./MyPayments"));
export const MyComments = lazy(() => import("./MyComments"));
export const MyFavorites = lazy(() => import("./MyFavorites"));
export const Notifications = lazy(() => import("./Notifications"));
export const MyTickets = lazy(() => import("./MyTickets"));
export const MyClasses = lazy(() => import("./MyClasses"));
export const MyHomeWorks = lazy(() => import("./MyHomeWorks"));
export const TicketDetail = lazy(
  () => import("../userPanel/ticket/TicketDetail"),
);
