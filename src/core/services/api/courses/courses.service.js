import useGetQuery from "../../common/useGetQuery";

export const useGetCoursesLevels = (key) =>
  useGetQuery(key, `CourseLevel/GetAllCourseLevel`);
