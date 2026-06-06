import {
  Articles,
  CourseDetail,
  Courses,
  Landing,
  NotFound,
} from "../../pages";
import { MainLayout } from "../../templates";
import ReviewPage from "@/components/organisms/couresDetail/ReviewPage";
import CommentsPage from "@/components/organisms/couresDetail/CommentsPage";

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
        path: "/Courses",
        element: <Courses />,
      },
      {
        path: "/Courses/Detail/:id",
        element: <CourseDetail />,
        children: [
          {
            path: "Review",
            element: <ReviewPage />,
          },
          {
            path: "Comments",
            element: <CommentsPage />,
          },
        ],
      },
      {
        path: "/Articles",
        element: <Articles />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default mainRoute;
