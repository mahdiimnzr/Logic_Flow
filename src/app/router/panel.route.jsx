import {
  AllInformation,
  Dashboard,
  LocationInformation,
  SocialNetworkInformation,
  UserInformation,
} from "@/components/organisms/userPanel";
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
        path: "MyComments",
        children: [
          {
            path: "",
            element: <Navigate to="Course" />,
          },
          {
            path: "Course",
            element: <Dashboard />,
          },
          {
            path: "Articles",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "MyFavorite",
        children: [
          {
            path: "",
            element: <Navigate to="Course" />,
          },
          {
            path: "Course",
            element: <Dashboard />,
          },
          {
            path: "Articles",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];

export default panelRoute;
