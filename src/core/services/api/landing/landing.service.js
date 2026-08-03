import deleteParams from "../../common/deleteParams";
import postParams from "../../common/postParams";
import useGetQuery from "../../common/useGetQuery";

export const addFavoriteCourse = (params) =>
  postParams(`Course/AddCourseFavorite`, params);
export const addFavoriteArticle = ({ id }) =>
  postParams(`News/AddFavoriteNews?NewsId=${id}`);
export const removeFavoriteCourse = ({ formData }) =>
  deleteParams(`Course/DeleteCourseFavorite`, formData);
export const useGetLandingReport = () =>
  useGetQuery("LandingReport", "Home/LandingReport");
export const useGetUnSeenNotifications = () =>
  useGetQuery("NotSeenNotifications", "v2/notification/alert/mineNoSeen");
