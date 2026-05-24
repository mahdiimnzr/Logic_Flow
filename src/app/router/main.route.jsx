import { Landing } from "../../pages";
import { MainLayout } from "../../templates";

const mainRoute = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
];

export default mainRoute;
