import { Navigate } from "react-router-dom";
import { CourseDetail, Courses, Landing } from "../../pages";
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
            path: "",
            element: <Navigate to={`Review`} />,
          },
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
    ],
  },
];

export default mainRoute;
