import useGetQuery from "../../common/useGetQuery";

export const useGetCourseDetail = (id) =>
  useGetQuery(`courseDetail${id}`, `Home/GetCourseDetails?CourseId=${id}`);
