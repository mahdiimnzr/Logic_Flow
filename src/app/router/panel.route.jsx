import {
  AllInformation,
  Dashboard,
  LocationInformation,
  MyComments,
  MyCourses,
  MyFavorites,
  MyPayments,
  Notifications,
  ReservedCourses,
  SecuritySetting,
  SocialNetworkInformation,
  UserInformation,
  MyTickets,
  MyClasses,
  MyHomeWorks,
} from "@/components/organisms/userPanel";
import TicketDetail from "@/components/organisms/userPanel/ticket/TicketDetail";
import { UserPanelLayout } from "@/templates";
import { Navigate } from "react-router-dom";

const panelRoute = [
  {
    path: "/UserPanel",
    element: <UserPanelLayout />,
    children: [
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "UserInformation",
        element: <UserInformation />,
        children: [
          {
            path: "",
            element: <Navigate to="AllInformation" />,
          },
          {
            path: "AllInformation",
            element: <AllInformation />,
          },
          {
            path: "LocationInformation",
            element: <LocationInformation />,
          },
          {
            path: "SocialNetworkInformation",
            element: <SocialNetworkInformation />,
          },
        ],
      },
      {
        path: "MyCourses",
        element: <MyCourses />,
      },
      {
        path: "ReservedCourses",
        element: <ReservedCourses />,
      },
      {
        path: "MyPayments",
        element: <MyPayments />,
      },
      {
        path: "MyComments",
        element: <MyComments />,
      },
      {
        path: "MyFavorite",
        element: <MyFavorites />,
      },
      {
        path: "Notifications",
        element: <Notifications />,
      },
      {
        path: "SecuritySetting",
        element: <SecuritySetting />,
      },
      {
        path: "MyClasses",
        element: <MyClasses />,
      },
      {
        path: "MyHomeWorks",
        element: <MyHomeWorks />,
      },
      {
        path: "MyTickets",
        element: <MyTickets />,
      },
      {
        path: "TicketDetail/:id",
        element: <TicketDetail />,
      },
    ],
  },
];

export default panelRoute;
