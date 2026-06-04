import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail2 from "../../../assets/images/teacherDetail 2.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";
import { useContext, useEffect, useState } from "react";
import TextAreaInput from "../Inputs/TextAreaInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCourseCommentLike,
  postCourseCommentDisSLike,
  postCourseCommentLike,
  useGetCourseReplyComment,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import FormInput from "../Inputs/FormInput";
import ReplyComment from "../ReplyCommnets/ReplyComment";
import ThemeContext from "@/app/context/ThemeContext";

export const Comments = ({
  author,
  title,
  describe,
  pictureAddress,
  likeCount,
  disslikeCount,
  insertDate,
  commentId,
  currentUserIsLike,
  currentUserIsDissLike,
}) => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
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

  const {
    isLoading,
    data: CourseReplyComments,
    refetch,
  } = useGetCourseReplyComment(
    { CourseId: id, CommentId: commentId },
    commentId,
  );
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className={`flex flex-col gap-3`}>
      <div className={`flex gap-4 pt-10`}>
        <ImageFallback src={pictureAddress} fallback={teacherDetail2} />
        <div className={`flex flex-col gap-1`}>
          {" "}
          <p className={`text-default-black font-bold`}> {author}</p>
          <p className={`text-field-silver text-[14px] `}>
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
          <MessageCircle />
          <span
            className={`text-[12px] text-default-black`}
            onClick={() => setOpen(!Open)}
          >
            {" "}
            {Open ? `بستن پاسخ ها ` : `باز کردن پاسخ ها`}{" "}
          </span>
        </div>
        <div className={`flex justify-center items-center gap-1`}>
          <ThumbsDown
            className={`size-5`}
            onClick={() => disLikeCommentMutate(commentId)}
            color={
              currentUserIsDissLike ? `#008C78` : theme ? "#ffffff" : `#1e1e1e`
            }
          />
          <span className={`text-[14px] text-default-black`}>
            {disslikeCount}
          </span>
        </div>
        <div className={`flex justify-center items-center gap-1 `}>
          <ThumbsUp
            className={`size-5`}
            onClick={() => handleLike(commentId)}
            color={currentUserIsLike ? `#008C78` : `#1e1e1e`}
          />

          <span className={`text-[14px] text-default-black`}>{likeCount}</span>
        </div>
        <span
          className={`text-[12px] text-green-primary underline cursor-pointer `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen
            ? ` پاسخ دادن
`
            : `بستن پاسخ`}
        </span>
      </div>
      <div
        className={`flex flex-col self-center gap-[16px] pt-6 w-9/10  ${isOpen ? `h-full` : `h-0 overflow-hidden transition-all`} `}
      >
        <FormInput
          isComment={true}
          name={"text"}
          type={"text"}
          placeholder={"عنوان پاسخ را بنویسید"}
          className={` border xl:h-10! lg:h-8!  `}
          errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
        />

        <TextAreaInput
          name={"text"}
          type={"text"}
          placeholder={"متن دیدگاه خود را بنویسید"}
          className={`border`}
          fieldClassName={`xl:min-h-29.25! lg:h-22.25! max-h-33.25`}
        />
      </div>
      <div
        className={`flex flex-col gap-3 ${Open ? `h-full` : `h-0 overflow-hidden transition-all`}`}
      >
        {CourseReplyComments?.data.map((value, index) => (
          <ReplyComment
            key={index}
            courseId={value.courseId}
            author={value.author}
            pictureAddress={value.pictureAddress}
            title={value.title}
            describe={value.describe}
            currentUserIsDissLike={value.currentUserIsDissLike}
            currentUserIsLike={value.currentUserIsLike}
            insertDate={value.insertDate}
            likeCount={likeCount}
            disslikeCount={value.disslikeCount}
          />
        ))}
      </div>
    </div>
  );
};
