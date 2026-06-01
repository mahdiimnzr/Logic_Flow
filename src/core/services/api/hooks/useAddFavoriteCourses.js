import { toast } from "react-toastify";
import { addFavoriteCourse } from "../landing/landing.service";

const useAddFavoriteCourse = async (courseId) => {
  const response = await addFavoriteCourse({ courseId: courseId });
  if (response.data.success) {
    if (response.status != 400) toast.success(response.data.message);
    else {
      toast.error(response.data.message);
    }
  } else if (!response.data.success) {
    toast.error(response.data.message);
  }
};

export default useAddFavoriteCourse;
