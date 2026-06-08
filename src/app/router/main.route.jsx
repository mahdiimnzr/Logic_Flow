import {
  Articles,
  CourseDetail,
  Courses,
  Landing,
  NewsDetail,
  NotFound,
  TeacherDetail,
  Teachers,
} from "../../pages";
import { MainLayout } from "../../templates";
import ReviewPage from "@/components/organisms/couresDetail/ReviewPage";
import CommentsPage from "@/components/organisms/couresDetail/CommentsPage";
import NewsReview from "@/components/organisms/NewsDetail/NewsReview";
import NewsComments from "@/components/organisms/NewsDetail/NewsComments";

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
        path: "/Articles/Detail/:id",
        element: <NewsDetail />,
        children: [
          {
            path: "Review",
            element: <NewsReview />,
          },
          {
            path: "Comments",
            element: <NewsComments />,
          },
        ],
      },
      {
        path: "/Teachers",
        element: <Teachers />,
      },
      {
        path: "/Teachers/Detail/:id",
        element: <TeacherDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default mainRoute;
