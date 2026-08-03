import deleteParams from "../../common/deleteParams";
import patchParams from "../../common/patchParams";
import postParams from "../../common/postParams";
import putParams from "../../common/putParams";
import useGetQuery from "../../common/useGetQuery";
import apiClient from "../../interceptor/interceptor.service";

export const useGetUserDetail = () =>
  useGetQuery("UserDetail", "SharePanel/GetProfileInfo");
export const useGetMyCourses = (key, params) => {
  return useGetQuery(key, `SharePanel/GetMyCourses`, params);
};
export const useGetMyReserveCourses = () =>
  useGetQuery("MyReserveCourses", `SharePanel/GetMyCoursesReserve`);
export const updateProfileDetail = (params) =>
  putParams(`SharePanel/UpdateProfileInfo`, params);
export const addUserProfileImage = (params) =>
  postParams("SharePanel/AddProfileImage", params);
export const selectUserProfileImage = (params) =>
  postParams("SharePanel/SelectProfileImage", params, { isExeption: true });
export const deleteUserProfileImage = (params) =>
  deleteParams("SharePanel/DeleteProfileImage", params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getAddressByCoordination = (lat, lon) =>
  apiClient.get(
    `https://photonmap.mahdi7813nazarzadeh-c44.workers.dev/reverse?lat=${lat}&lon=${lon}`,
  );

export const getAddressBySearch = (query) =>
  apiClient.get(
    `https://photonmap.mahdi7813nazarzadeh-c44.workers.dev/search?q=${encodeURIComponent(query)}`,
  );
export const coursePaymentStep1 = (params) => {
  const response = apiClient.patch(
    `NewVersion/CoursePayment/StepOneToPay/${params.reserveId}`,
    params.initialValue,
  );
  return response;
};
export const coursePaymentStep2 = (params) => {
  const response = apiClient.patch(
    `NewVersion/CoursePayment/StepTwoToPay/${params.reserveId}`,
    params.authority,
  );
  return response;
};
export const useGetCourseReceipt = (courseId) =>
  useGetQuery(
    `CourseReceipt${courseId}`,
    `CoursePayment/StudentUserPayList?CourseId=${courseId}`,
  );
export const useGetSecuritySetting = () =>
  useGetQuery("SecuritySetting", "SharePanel/GetSecurityInfo");

export const changePassword = (body) =>
  postParams("SharePanel/ChangePassword", body);

export const editSecurity = (body) =>
  putParams("SharePanel/EditSecurity", body);
export const deleteCourseReserve = (body) =>
  deleteParams("CourseReserve", body);
export const useGetCoursePaymentList = () =>
  useGetQuery(`CoursePaymentsList`, `CoursePayment/StudentUserPayList`);
export const useGetMyCourseComments = () =>
  useGetQuery(`MyCourseCommentsList`, `SharePanel/GetMyCoursesComments`);
export const useGetMyArticlesComments = () =>
  useGetQuery(`MyArticlesCommentsList`, `SharePanel/GetMyNewsComments`);
export const deleteCourseComment = (commentId) =>
  deleteParams(`Course/DeleteCourseComment?CourseCommandId=${commentId}`);
export const useGetMyFavoriteArticles = () =>
  useGetQuery("MyFavoriteNews", "SharePanel/GetMyFavoriteNews");
export const useGetMyFavoriteCourses = () =>
  useGetQuery("MyFavoriteCourses", "SharePanel/GetMyFavoriteCourses");

export const useGetMultiAccount = () =>
  useGetQuery("MultiAccount", "v2/multiAccount/myAccounts");
export const addAccount = (body) =>
  postParams("v2/multiAccount/addAccount", body);

export const removeAccount = (id) =>
  patchParams(`v2/multiAccount/removeAccount/${id}`);
export const activeAccount = (id) =>
  patchParams(`v2/multiAccount/activeAccount/${id}`);

export const useGetMyNotifications = () =>
  useGetQuery("MyNotifications", "v2/notification/alert/mineAll");
export const seenNotification = (notifId) =>
  patchParams(`v2/notification/alert/see/${notifId}`);
export const useGetMyClasses = () =>
  useGetQuery("MyClasses", "Schedual/GetMine");
export const useGetSessionDetail = (sessionId) =>
  useGetQuery(
    `SessionDetail-${sessionId}`,
    `Session/SessionDetail?SessionId=${sessionId}`,
  );
export const addAbsentStatus = (body) => postParams("Session/Student_AP", body);
export const useGetUserHomeWorks = () =>
  useGetQuery("UserHomeWorks", "Session/StudentHomeworkList");
export const addHomeWorkFirst = (body) =>
  postParams("Session/AddCourseUserHomeWork", body);
export const addHomeWorkSecond = (body) =>
  postParams("Session/AddExerciseFile", body);
