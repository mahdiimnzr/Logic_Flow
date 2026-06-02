import apiClient from "../../interceptor/interceptor.service";

export const getCourseDetails = async (id) => {
  try {
    const result = await apiClient.get(`Home/GetCourseDetails?CourseId=${id}`);
    return result;
  } catch (error) {
    return error;
  }
};
