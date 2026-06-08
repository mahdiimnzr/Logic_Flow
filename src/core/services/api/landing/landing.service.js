import deleteParams from "../../common/deleteParams";
import postParams from "../../common/postParams";

export const addFavoriteCourse = (params) =>
  postParams(`Course/AddCourseFavorite`, params);
export const addFavoriteArticle = ({ id }) =>
  postParams(`News/AddFavoriteNews?NewsId=${id}`);
export const removeFavoriteCourse = ({ formData }) =>
  deleteParams(`Course/DeleteCourseFavorite`, formData);
