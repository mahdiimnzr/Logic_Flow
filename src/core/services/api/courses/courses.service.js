import useGetQuery from "../../common/useGetQuery";
import apiClient from "../../interceptor/interceptor.service";

export const useGetCoursesLevels = (key) =>
  useGetQuery(key, `CourseLevel/GetAllCourseLevel`);
export const useGetCoursesTechnologies = (key) =>
  useGetQuery(key, `Home/GetTechnologies`);
export const useGetCoursesTypes = (key) =>
  useGetQuery(key, `CourseType/GetCourseTypes`);
export const getCourseFuzzySearch = (text) => {
  const response = apiClient(`Course/FuzzySeach/${text}`);
  return response;
};
