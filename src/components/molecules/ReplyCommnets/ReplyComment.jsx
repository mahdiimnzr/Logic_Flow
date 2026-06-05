import { ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail3 from "../../../assets/images/teacherDetail3.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import {
  deleteCourseCommentLike,
  postCourseCommentDisSLike,
  postCourseCommentLike,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
import { toast } from "react-toastify";

const ReplyComment = ({
  author,
  pictureAddress,
  insertDate,
  title,
  describe,
  likeCount,
  disslikeCount,
  currentUserIsLike,
  commentId,
}) => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);

  const { mutate: likeCommentMutate } = useMutation({
    mutationFn: postCourseCommentLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({
          queryKey: [`courseComment${id}`],
        });
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const { mutate: deleteLikeCommentMutate } = useMutation({
    mutationFn: deleteCourseCommentLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({
          queryKey: [`courseComment${id}`],
        });
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const { mutate: disLikeCommentMutate } = useMutation({
    mutationFn: postCourseCommentDisSLike,

    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({
          queryKey: [`courseComment${id}`],
        });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const handleLike = (CourseCommandId) => {
    if (currentUserIsLike) {
      deleteLikeCommentMutate(CourseCommandId);
    } else if (!currentUserIsLike) {
      likeCommentMutate(CourseCommandId);
    }
  };
  return (
    <div className={`flex flex-col pr-12`}>
      <div className={`flex gap-4 `}>
        <ImageFallback src={pictureAddress} fallback={teacherDetail3} />

        <div>
          {" "}
          <p className={`text-default-black font-bold`}>{author}</p>
          <p className={`text-field-silver text-[14px] `}>
            {" "}
            {formatDate(insertDate)}
          </p>
        </div>
      </div>
      <div>
        {" "}
        <span className={`text-[14px] text-default-black`}>{title}</span>
        <p className={`text-[14px] text-field-silver leading-loose`}>
          {describe}
        </p>
      </div>
      <div className={`h-5.25 flex gap-6 cursor-pointer`}>
        <div className={`flex justify-center items-center gap-1`}>
          <ThumbsDown
            className={`size-5`}
            onClick={() => disLikeCommentMutate(commentId)}
          />
          <span className={`text-[14px] text-default-black`}>
            {disslikeCount}
          </span>
        </div>
        <div className={`flex justify-center items-center gap-1 `}>
          <ThumbsUp
            className={`size-5`}
            onClick={() => handleLike(commentId)}
          />
          <span className={`text-[14px] text-default-black`}>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
