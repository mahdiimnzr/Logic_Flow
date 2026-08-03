import { MessageCircle, Pencil, ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail2 from "../../../assets/images/teacherDetail 2.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import * as Yup from "yup";
import FormInput from "@/components/molecules/Inputs/FormInput";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import { Form, Formik } from "formik";
import ReplyComment from "./ReplyComment";
import {
  deleteNewsCommentLike,
  postAddReplyCommentNews,
  postNewsCommentLikeAndDisLike,
  updateNewsComment,
  useGetNewsReplyComments,
} from "@/core/services/api/newsDetails/newsDetails.service";
import { useI18n } from "@/i18n/useI18n";

const Comments = ({
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
  currentUserLikeId,
  userId,
  currentUserId,
}) => {
  const { t } = useI18n();
  const validationSchema = Yup.object({
    title: Yup.string().required(t("newsDetail.inputsError")),
    describe: Yup.string().required(t("newsDetail.inputsError")),
  });

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);

  const { mutate: likeCommentMutate } = useMutation({
    mutationFn: postNewsCommentLikeAndDisLike,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`newsComments${id}`] });
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
          queryClient.invalidateQueries({ queryKey: [`newsComments${id}`] });
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
          queryClient.invalidateQueries({ queryKey: [`newsComments${id}`] });
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

  const { mutate: AddCommentCourse } = useMutation({
    mutationFn: postAddReplyCommentNews,
    onSuccess: (result, values) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({
          queryKey: [`NewsReplyComment${commentId}`],
        });
        values.title = "";
        values.describe = "";
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const { mutate: updateCommentNews } = useMutation({
    mutationFn: updateNewsComment,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        setIsUpdateOpen(false);
        queryClient.invalidateQueries({
          queryKey: [`newsComments${id}`],
        });
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const {
    isLoading,
    data: NewsReplyComments,
    refetch,
  } = useGetNewsReplyComments(commentId);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className={`flex flex-col gap-8`}>
      <div className={`flex flex-col gap-6`}>
        <div className={`flex flex-col gap-3`}>
          <div className={`flex gap-4`}>
            <ImageFallback
              className={`rounded-full md:size-14 sm:size-12 size-10`}
              src={pictureAddress}
              fallback={teacherDetail2}
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
            {NewsReplyComments?.data?.length > 0 && (
              <div
                onClick={() => setOpen(!Open)}
                className={`flex items-center gap-1 cursor-pointer`}
              >
                <MessageCircle
                  width={"18"}
                  color={!theme ? "#1E1E1E" : "#FFFFFF"}
                />
                <span
                  className={`md:text-[12px] text-[10px] text-default-black font-normal`}
                >
                  {Open
                    ? t("newsDetail.closeAnswers")
                    : t("newsDetail.openAnswers")}
                </span>
              </div>
            )}
            <div className={`flex justify-center items-center gap-1`}>
              <ThumbsDown
                width={"18"}
                onClick={() =>
                  disLikeCommentMutate({
                    CourseCommandId: commentId,
                    likeOrDisLike: false,
                  })
                }
                color={
                  currentUserIsDissLike
                    ? `#008C78`
                    : !theme
                      ? `#1e1e1e`
                      : "#FFFFFF"
                }
                className={`cursor-pointer`}
              />
              <span
                className={`md:text-[12px] text-[10px] text-default-black font-normal`}
              >
                {disslikeCount}
              </span>
            </div>
            <div className={`flex justify-center items-center gap-1 `}>
              <ThumbsUp
                width={"18"}
                onClick={() => handleLike(commentId)}
                color={
                  currentUserIsLike ? `#008C78` : !theme ? `#1e1e1e` : "#FFFFFF"
                }
                className={`cursor-pointer`}
              />
              <span
                className={`md:text-[12px] text-[10px] text-default-black font-normal`}
              >
                {likeCount}
              </span>
            </div>
            <span
              className={`md:text-[12px] text-[10px] text-green-primary underline cursor-pointer font-normal`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? t("newsDetail.answer") : t("newsDetail.closeAnswer")}
            </span>
            {userId == currentUserId && (
              <Pencil
                width={"18"}
                onClick={() => {
                  setIsUpdateOpen(!isUpdateOpen);
                  setIsOpen(false);
                }}
                color={!theme ? `#1e1e1e` : "#FFFFFF"}
                className={`cursor-pointer`}
              />
            )}
          </div>
        </div>
        <Formik
          initialValues={{
            newsId: id,
            userIpAddress: null,
            title: "",
            describe: "",
            userId: null,
            parentId: commentId,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            AddCommentCourse(values);
          }}
        >
          {({ errors }) => (
            <Form
              className={`flex flex-col self-center gap-4 pt-6 w-9/10  ${isOpen ? `block` : `hidden`}`}
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
                {t("newsDetail.addComment")}
              </Button>
            </Form>
          )}
        </Formik>
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
      <div className={`flex flex-col gap-8 ${Open ? `block` : `hidden`}`}>
        {NewsReplyComments?.data.map((value, index) => (
          <ReplyComment
            key={index}
            author={value.userFullName}
            commentId={value.id}
            title={value.title}
            describe={value.describe}
            likeCount={value.likeCount}
            disslikeCount={value.dissLikeCount}
            parentCommentId={commentId}
            insertDate={value.inserDate}
            currentUserIsDissLike={value.currentUserIsDissLike}
            currentUserIsLike={value.currentUserIsLike}
            currentUserLikeId={value.currentUserLikeId}
            userId={value.userId}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
