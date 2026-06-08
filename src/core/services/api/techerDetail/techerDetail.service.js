import useGetQuery from "../../common/useGetQuery";

export const useGetTeachersDetail = (TeacherId) =>
  useGetQuery(
    `TeachersAll${TeacherId}`,
    `Home/GetTeacherDetails?TeacherId=${TeacherId}`,
  );
