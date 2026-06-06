import useGetQuery from "../../common/useGetQuery";

const useGetCourses = (key, params) =>
  useGetQuery(key, "Home/GetCoursesWithPagination", params);

export default useGetCourses;
