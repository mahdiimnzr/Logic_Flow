import { toast } from "react-toastify";
import { addFavoriteArticle } from "../landing/landing.service";

const useAddFavoriteArticle = async (articleId) => {
  const response = await addFavoriteArticle(articleId);
  if (response.data.success) {
    if (response.status != 400) toast.success(response.data.message);
    else {
      toast.error(response.data.message);
    }
  } else if (!response.data.success) {
    toast.error(response.data.message);
  }
};

export default useAddFavoriteArticle;
