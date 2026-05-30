import postParams from "../../common/postParams";

export const addFavoriteCourse = (params) =>
  postParams(`Course/AddCourseFavorite`, params);
export const addFavoriteArticle = (params) =>
  postParams(`News/AddFavoriteNews?NewsId=${params}`);
