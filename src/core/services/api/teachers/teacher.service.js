import useGetQuery from "../../common/useGetQuery";

export const useGetTeachers = () =>
  useGetQuery(`TeachersAll`, `Home/GetTeachers`);
