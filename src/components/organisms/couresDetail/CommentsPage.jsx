import FormInput from "@/components/molecules/Inputs/FormInput";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import {
  postAddCommentCourse,
  useGetCourseComments,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
import { useEffect } from "react";
import { Comments } from "@/components/molecules/comments/Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Buttons/Button";
import formDataConverter from "@/core/utils/formDataConvertor";

const CommentsPage = () => {
  const validationSchema = Yup.object({
    Title: Yup.string().required("فیلد خالی است"),
    Describe: Yup.string().required("فیلد خالی است"),
  });

  const { id } = useParams();
  const { isLoading, data: CourseComments, refetch } = useGetCourseComments(id);
  const queryClient = useQueryClient();

  const { mutate: AddCommentCourse } = useMutation({
    mutationFn: postAddCommentCourse,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`courseDetail${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <Formik
      initialValues={{
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
        console.log(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div
            className={` bg-default-light w-[877px] p-10 flex flex-col rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <div className={`flex gap-2`}>
              <span className={`text-field-silver`}>همه ی نظرات</span>
              <div className={` size-[22px] rounded-full bg-light-gray`}></div>
            </div>

            <div className={`flex flex-col gap-[16px] pt-6 `}>
              <span className={`font-bold text-default-black`}>
                عنوان دیدگاه
              </span>
              <FormInput
                isComment={true}
                error={errors.Title}
                name={"Title"}
                type={"text"}
                placeholder={"عنوان دیدگاه خود را بنویسید"}
                className={` border xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11! `}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <span className={`font-bold text-default-black`}>متن دیدگاه</span>
              <TextAreaInput
                name={"Describe"}
                error={errors.Describe}
                type={"text"}
                placeholder={"متن دیدگاه خود را بنویسید"}
                className={` border `}
                fieldClassName={`xl:min-h-51! lg:min-h-48! max-h-55`}
              />
              <Button color={"authBtn"} className={`px-2 py-1`}>
                اضافه کردن نظر
              </Button>
            </div>
            <div className={`flex flex-col`}>
              {CourseComments?.data.map((value, index) => (
                <Comments
                  key={index}
                  author={value.author}
                  commentId={value.id}
                  title={value.title}
                  pictureAddress={value.pictureAddress}
                  describe={value.describe}
                  likeCount={value.likeCount}
                  disslikeCount={value.disslikeCount}
                  insertDate={value.insertDate}
                  currentUserIsDissLike={value.currentUserIsDissLike}
                  currentUserIsLike={value.currentUserIsLike}
                />
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CommentsPage;
