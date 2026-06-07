import { toast } from "react-toastify";
import {
  addFavoriteCourse,
  removeFavoriteCourse,
} from "../landing/landing.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFavoriteCourse = () => {
  const queryClient = useQueryClient();
  const { mutate: addFavoriteCourseMutate } = useMutation({
    mutationFn: addFavoriteCourse,
    onSuccess: (response, variables) => {
      const { key } = variables;
      if (response.data.success) {
        if (response.status != 400) {
          toast.success(response.data.message);
          queryClient.invalidateQueries({ queryKey: [key] });
        } else {
          toast.error(response.data.message);
        }
      } else if (!response.data.success) {
        toast.error(response.data.message);
      }
    },
  });
  const { mutate: removeFavoriteCourseMutate } = useMutation({
    mutationFn: removeFavoriteCourse,
    onSuccess: (response, variables) => {
      const { key } = variables;
      if (response.data.success) {
        if (response.status != 400) {
          toast.success(response.data.message);
          queryClient.invalidateQueries({ queryKey: [key] });
        } else {
          toast.error(response.data.message);
        }
      } else if (!response.data.success) {
        toast.error(response.data.message);
      }
    },
  });
  return { addFavoriteCourseMutate, removeFavoriteCourseMutate };
};

export default useFavoriteCourse;
