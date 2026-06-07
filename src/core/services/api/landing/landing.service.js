import deleteParams from "../../common/deleteParams";
import postParams from "../../common/postParams";

export const addFavoriteCourse = (params) =>
  postParams(`Course/AddCourseFavorite`, params);
export const addFavoriteArticle = (params) =>
  postParams(`News/AddFavoriteNews?NewsId=${params}`);
export const removeFavoriteCourse = ({ formData }) =>
  deleteParams(`Course/DeleteCourseFavorite`, formData);
