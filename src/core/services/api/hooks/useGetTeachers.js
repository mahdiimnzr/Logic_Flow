import useGetQuery from "../../common/useGetQuery";

const useGetTeachers = (key, params) =>
  useGetQuery(key, "Home/GetTeachers", params);

export default useGetTeachers;
