import deleteParams from "../../common/deleteParams";
import postParams from "../../common/postParams";
import useGetQuery from "../../common/useGetQuery";

export const useGetNewsDetails = (id) =>
  useGetQuery(`newsDetails${id}`, `News/${id}`);
export const useGetNewsComments = (id) =>
  useGetQuery(`newsComments${id}`, `News/GetNewsComments?NewsId=${id}`);
export const useGetNewsReplyComments = (id) =>
  useGetQuery(`NewsReplyComment${id}`, `News/GetRepliesComments?Id=${id}`);

export const postNewsRating = (params) =>
  postParams(
    `News/NewsRate?NewsId=${params.newsId}&RateNumber=${params.rateNumber}`,
  );
export const deleteFavoriteNews = (params) =>
  deleteParams(`News/DeleteFavoriteNews`, params);
export const postNewsLike = (id) => postParams(`News/NewsLike/${id}`);
export const deleteNewsLike = async (likeId) =>
  deleteParams(`News/DeleteLikeNews`, likeId);
export const postNewsDisLike = (id) => postParams(`News/NewsDissLike/${id}`);
export const postAddCommentsNews = (params) =>
  postParams(`News/CreateNewsComment`, params);
export const postAddReplyCommentNews = (params) =>
  postParams(`News/CreateNewsReplyComment`, params);
export const postNewsCommentLikeAndDisLike = (params) =>
  postParams(
    `News/CommentLike/${params.CourseCommandId}?LikeType=${params.likeOrDisLike}`,
  );
export const deleteNewsCommentLike = (likeId) =>
  deleteParams(`News/DeleteCommentLikeNews`, likeId);
