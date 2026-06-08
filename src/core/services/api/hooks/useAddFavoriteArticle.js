import { toast } from "react-toastify";
import { addFavoriteArticle } from "../landing/landing.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavoriteNews } from "../newsDetails/newsDetails.service";

const useAddFavoriteArticle = () => {
  const queryClient = useQueryClient();
  const { mutate: addFavoriteNewsMutate } = useMutation({
    mutationFn: addFavoriteArticle,
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
  const { mutate: removeFavoriteNewsMutate } = useMutation({
    mutationFn: deleteFavoriteNews,
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
  return { addFavoriteNewsMutate, removeFavoriteNewsMutate };
};

export default useAddFavoriteArticle;
