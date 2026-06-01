import { CourseDetail, Landing } from "../../pages";
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
      {
        path: "/Course/CourseDetail/:id",
        element: <CourseDetail />,
      },
    ],
  },
];

export default mainRoute;
