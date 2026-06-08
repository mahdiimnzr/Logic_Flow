import useGetQuery from "../../common/useGetQuery";

export const useGetUserDetail = () =>
  useGetQuery("UserDetail", "SharePanel/GetProfileInfo");
