import deleteParams from "../../common/deleteParams";
import postParams from "../../common/postParams";
import putParams from "../../common/putParams";
import useGetQuery from "../../common/useGetQuery";

export const useGetCourseDetail = (id, options = {}) =>
  useGetQuery(
    `courseDetail${id}`,
    `Home/GetCourseDetails?CourseId=${id}`,
    null,
    options,
  );
export const useGetCourseReplyComment = (params, id) =>
  useGetQuery(
    `CourseReplyComment${id}`,
    `Course/GetCourseReplyCommnets/${params.CourseId}/${params.CommentId}`,
  );
export const useGetCourseComments = (id, options = {}) =>
  useGetQuery(
    `courseComment${id}`,
    `Course/GetCourseCommnets/${id}`,
    null,
    options,
  );
export const postCourseLike = (id) =>
  postParams(`Course/AddCourseLike?CourseId=${id}`);
export const postCourseDisSLike = (id) =>
  postParams(`Course/AddCourseDissLike?CourseId=${id}`);
export const deleteCourseLike = async (likeId) =>
  deleteParams(`Course/DeleteCourseLike`, likeId);
export const deleteCourseDisLike = (dislikeId) =>
  deleteParams(`Course/DeleteCourseDissLike`, dislikeId);
export const postReserveAdd = (courseId) =>
  postParams(`CourseReserve/ReserveAdd`, courseId);

export const postCourseCommentLike = (CourseCommandId) =>
  postParams(`Course/AddCourseCommentLike?CourseCommandId=${CourseCommandId}`);
export const deleteCourseCommentLike = (CourseCommandId) =>
  deleteParams(
    `Course/DeleteCourseCommentLike?CourseCommandId=${CourseCommandId}`,
  );
export const postCourseCommentDisSLike = (CourseCommandId) =>
  postParams(
    `Course/AddCourseCommentDissLike?CourseCommandId=${CourseCommandId}`,
  );
export const postAddCommentCourse = (params) =>
  postParams(`Course/AddCommentCourse`, params);
export const postAddReplyCommentCourse = (params) =>
  postParams(`Course/AddReplyCourseComment`, params);
export const postCourseRating = (params) =>
  postParams(
    `Course/SetCourseRating?CourseId=${params.courseId}&RateNumber=${params.rateNumber}`,
  );
export const updateCourseComment = (body) =>
  putParams("Course/UpdateCourseComment", body);
