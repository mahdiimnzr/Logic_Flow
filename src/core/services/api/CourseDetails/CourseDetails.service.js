import useGetQuery from "../../common/useGetQuery";
import apiClient from "../../interceptor/interceptor.service";
export const useGetCourseDetail = (id) =>
  useGetQuery(`courseDetail${id}`, `Home/GetCourseDetails?CourseId=${id}`);
export const postCourseLike = async (id) => {
  try {
    const result = await apiClient.post(`Course/AddCourseLike?CourseId=${id}`);
    return result;
  } catch (error) {
    return error;
  }
};
export const postCourseDisSLike = async (id) => {
  try {
    const result = await apiClient.post(
      `Course/AddCourseDissLike?CourseId=${id}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const deleteCourseLike = async (likeId) => {
  try {
    const result = await apiClient.delete(`Course/DeleteCourseLike`, {
      data: likeId,
    });
    return result;
  } catch (error) {
    return error;
  }
};
export const postReserveAdd = async (courseId) => {
  try {
    const result = await apiClient.post(`CourseReserve/ReserveAdd`, courseId);
    return result;
  } catch (error) {
    return error;
  }
};
export const useGetCourseComments = (id) =>
  useGetQuery(`courseComment${id}`, `Course/GetCourseCommnets/${id}`);
export const postCourseCommentLike = async (CourseCommandId) => {
  try {
    const result = await apiClient.post(
      `Course/AddCourseCommentLike=${CourseCommandId}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const deleteCourseCommentLike = async (CourseCommandId) => {
  try {
    const result = await apiClient.delete(
      `Course/DeleteCourseCommentLike=${CourseCommandId}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export const postCourseCommentDisSLike = async (CourseCommandId) => {
  try {
    const result = await apiClient.post(
      `Course/AddCourseCommentDissLike=${CourseCommandId}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
