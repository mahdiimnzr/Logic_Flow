import useGetQuery from "../../common/useGetQuery";

export const useGetCoursesLevels = (key) =>
  useGetQuery(key, `CourseLevel/GetAllCourseLevel`);
export const useGetCoursesTechnologies = (key) =>
  useGetQuery(key, `Home/GetTechnologies`);
export const useGetCoursesTypes = (key) =>
  useGetQuery(key, `CourseType/GetCourseTypes`);
