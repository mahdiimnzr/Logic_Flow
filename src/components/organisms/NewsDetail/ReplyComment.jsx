import { ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail3 from "../../../assets/images/teacherDetail3.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import { toast } from "react-toastify";
import {
  deleteNewsCommentLike,
  postNewsCommentLikeAndDisLike,
} from "@/core/services/api/newsDetails/newsDetails.service";

const ReplyComment = ({
  author,
  parentCommentId,
  pictureAddress,
  insertDate,
  title,
  describe,
  likeCount,
  disslikeCount,
  currentUserIsLike,
  currentUserIsDissLike,
  currentUserLikeId,
  commentId,
}) => {
  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);

  const { mutate: likeCommentMutate } = useMutation({
    mutationFn: postNewsCommentLikeAndDisLike,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({
            queryKey: [`NewsReplyComment${parentCommentId}`],
          });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const { mutate: deleteLikeCommentMutate } = useMutation({
    mutationFn: deleteNewsCommentLike,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({
            queryKey: [`NewsReplyComment${parentCommentId}`],
          });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const { mutate: disLikeCommentMutate } = useMutation({
    mutationFn: postNewsCommentLikeAndDisLike,

    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({
            queryKey: [`NewsReplyComment${parentCommentId}`],
          });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const handleLike = (CourseCommandId) => {
    if (currentUserIsLike) {
      deleteLikeCommentMutate({
        deleteEntityId: currentUserLikeId,
      });
    } else if (!currentUserIsLike) {
      likeCommentMutate({
        CourseCommandId: CourseCommandId,
        likeOrDisLike: true,
      });
    }
  };
  return (
    <div className={`flex flex-col md:pr-12 pr-5`}>
      <div className={`flex gap-4`}>
        <ImageFallback
          src={pictureAddress}
          fallback={teacherDetail3}
          className={`rounded-full md:size-14 sm:size-12 size-10`}
        />

        <div className={`flex flex-col gap-0.5`}>
          <p
            className={`text-default-black font-bold md:text-base text-[14px]`}
          >
            {author}
          </p>
          <p
            className={`text-field-silver md:text-[14px] text-[12px] font-normal`}
          >
            {formatDate(insertDate)}
          </p>
        </div>
      </div>
      <div>
        <span
          className={`md:text-[14px] text-[12px] text-default-black font-normal`}
        >
          {title}
        </span>
        <p
          className={`md:text-[14px] text-[12px] text-field-silver leading-loose font-normal`}
        >
          {describe}
        </p>
      </div>
      <div className={`flex items-center md:gap-6 gap-3`}>
        <div className={`flex justify-center items-center gap-1`}>
          <ThumbsDown
            className={`cursor-pointer`}
            onClick={() =>
              disLikeCommentMutate(
                disLikeCommentMutate({
                  CourseCommandId: commentId,
                  likeOrDisLike: false,
                }),
              )
            }
            color={
              currentUserIsDissLike ? `#008C78` : !theme ? `#1e1e1e` : "#FFFFFF"
            }
            width={"18"}
          />
          <span
            className={`md:text-[12px] text-[10px] text-default-black font-normal`}
          >
            {disslikeCount}
          </span>
        </div>
        <div className={`flex justify-center items-center gap-1 `}>
          <ThumbsUp
            className={`cursor-pointer`}
            onClick={() => handleLike(commentId)}
            color={
              currentUserIsLike ? `#008C78` : !theme ? `#1e1e1e` : "#FFFFFF"
            }
            width={"18"}
          />
          <span className={`text-[12px] text-default-black font-normal`}>
            {likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
