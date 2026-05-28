import useGetQuery from "../../common/useGetQuery";

const useGetCourses = (params) =>
  useGetQuery("Courses", "Home/GetCoursesWithPagination", params);

export default useGetCourses;
