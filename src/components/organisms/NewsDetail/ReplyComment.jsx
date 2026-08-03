import { Pencil, ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail3 from "../../../assets/images/teacherDetail3.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import { toast } from "react-toastify";
import {
  deleteNewsCommentLike,
  postNewsCommentLikeAndDisLike,
  updateNewsComment,
} from "@/core/services/api/newsDetails/newsDetails.service";
import { useParams } from "react-router-dom";
import Button from "@/components/atoms/Buttons/Button";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import FormInput from "@/components/molecules/Inputs/FormInput";
import { Form, Formik } from "formik";
import { useI18n } from "@/i18n/useI18n";
import * as Yup from "yup";

const ReplyComment = ({
  author,
  parentCommentId,
  insertDate,
  title,
  describe,
  likeCount,
  disslikeCount,
  currentUserIsLike,
  currentUserIsDissLike,
  currentUserLikeId,
  commentId,
  userId,
  currentUserId,
}) => {
  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { t } = useI18n();
  const validationSchema = Yup.object({
    title: Yup.string().required(t("newsDetail.inputsError")),
    describe: Yup.string().required(t("newsDetail.inputsError")),
  });

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
  const { mutate: updateCommentNews } = useMutation({
    mutationFn: updateNewsComment,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        setIsUpdateOpen(false);
        queryClient.invalidateQueries({
          queryKey: [`NewsReplyComment${parentCommentId}`],
        });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  return (
    <div className={`flex flex-col md:pr-12 pr-5`}>
      <div className={`flex gap-4`}>
        <ImageFallback
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
        {userId == currentUserId && (
          <Pencil
            width={"18"}
            onClick={() => {
              setIsUpdateOpen(!isUpdateOpen);
            }}
            color={!theme ? `#1e1e1e` : "#FFFFFF"}
            className={`cursor-pointer`}
          />
        )}
      </div>
      <Formik
        initialValues={{
          id: commentId,
          newsId: id,
          title: title,
          describe: describe,
          accept: true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateCommentNews(values);
        }}
      >
        {({ errors }) => (
          <Form
            className={`flex flex-col self-center gap-4 pt-6 w-9/10  ${isUpdateOpen ? `block` : `hidden`}`}
          >
            <FormInput
              isComment={true}
              error={errors.title}
              name={"title"}
              type={"text"}
              placeholder={t("newsDetail.commentTitlePlaceHolder")}
              className={`h-10!`}
              errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
            />
            <TextAreaInput
              name={"describe"}
              error={errors.describe}
              type={"text"}
              placeholder={t("newsDetail.commentDescribePlaceHolder")}
              fieldClassName={`xl:min-h-29.25! xl:max-h-35 lg:min-h-22.25! lg:max-h-30 min-h-20 max-h-25`}
            />
            <Button color={"authBtn"} className={`w-full py-3`}>
              {t("courseDetail.updateComment")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReplyComment;
