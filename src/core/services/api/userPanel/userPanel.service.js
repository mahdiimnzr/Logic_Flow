import putParams from "../../common/putParams";
import useGetQuery from "../../common/useGetQuery";

export const useGetUserDetail = () =>
  useGetQuery("UserDetail", "SharePanel/GetProfileInfo");
export const useGetMyCourses = (key, params) => {
  const queryString = new URLSearchParams(params).toString();
  return useGetQuery(key, `SharePanel/GetMyCourses?${queryString}`);
};
export const useGetMyReserveCourses = () =>
  useGetQuery("MyReserveCourses", `SharePanel/GetMyCoursesReserve`);
export const updateProfileDetail = (params) =>
  putParams(`SharePanel/UpdateProfileInfo`, params);
