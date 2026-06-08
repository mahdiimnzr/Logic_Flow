import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail2 from "../../../assets/images/teacherDetail 2.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCourseCommentLike,
  postAddReplyCommentCourse,
  postCourseCommentDisSLike,
  postCourseCommentLike,
  useGetCourseReplyComment,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import * as Yup from "yup";
import formDataConverter from "@/core/utils/formDataConvertor";
import FormInput from "@/components/molecules/Inputs/FormInput";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import { Form, Formik } from "formik";
import ReplyComment from "./ReplyComment";

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
}) => {
  const validationSchema = Yup.object({
    Title: Yup.string().required("فیلد خالی است"),
    Describe: Yup.string().required("فیلد خالی است"),
  });

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
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`courseComment${id}`] });
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
      deleteLikeCommentMutate(CourseCommandId);
    } else if (!currentUserIsLike) {
      likeCommentMutate(CourseCommandId);
    }
  };

  const { mutate: AddCommentCourse } = useMutation({
    mutationFn: postAddReplyCommentCourse,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({
          queryKey: [`CourseReplyComment${commentId}`],
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
  } = useGetCourseReplyComment(
    { CourseId: id, CommentId: commentId },
    commentId,
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Formik
      initialValues={{
        CommentId: commentId,
        CourseId: id,
        Title: "",
        Describe: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = formDataConverter(values);
        AddCommentCourse(formData);
        values.Title = "";
        values.Describe = "";
      }}
    >
      {({ errors }) => (
        <Form>
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
                        {Open ? `بستن پاسخ ها ` : `باز کردن پاسخ ها`}
                      </span>
                    </div>
                  )}
                  <div className={`flex justify-center items-center gap-1`}>
                    <ThumbsDown
                      width={"18"}
                      onClick={() => disLikeCommentMutate(commentId)}
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
                        currentUserIsLike
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
                      {likeCount}
                    </span>
                  </div>
                  <span
                    className={`md:text-[12px] text-[10px] text-green-primary underline cursor-pointer font-normal`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {!isOpen ? `پاسخ دادن` : `بستن پاسخ`}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col self-center gap-4 pt-6 w-9/10  ${isOpen ? `block` : `hidden`} `}
              >
                <FormInput
                  isComment={true}
                  error={errors.Title}
                  name={"Title"}
                  type={"text"}
                  placeholder={"عنوان پاسخ را بنویسید"}
                  className={`h-10!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                />
                <TextAreaInput
                  name={"Describe"}
                  error={errors.Describe}
                  type={"text"}
                  placeholder={"متن دیدگاه خود را بنویسید"}
                  fieldClassName={`xl:min-h-29.25! xl:max-h-35 lg:min-h-22.25! lg:max-h-30 min-h-20 max-h-25`}
                />
                <Button color={"authBtn"} className={`w-full py-3`}>
                  اضافه کردن نظر
                </Button>
              </div>
            </div>
            <div className={`flex flex-col gap-8 ${Open ? `block` : `hidden`}`}>
              {NewsReplyComments?.data.map((value, index) => (
                <ReplyComment
                  key={index}
                  parentCommentId={commentId}
                  commentId={value.id}
                  author={value.author}
                  pictureAddress={value.pictureAddress}
                  title={value.title}
                  describe={value.describe}
                  currentUserIsDissLike={value.currentUserIsDissLike}
                  currentUserIsLike={value.currentUserIsLike}
                  insertDate={value.insertDate}
                  likeCount={value.likeCount}
                  disslikeCount={value.disslikeCount}
                />
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Comments;
