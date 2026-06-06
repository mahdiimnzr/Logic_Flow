import FormInput from "@/components/molecules/Inputs/FormInput";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import {
  postAddCommentCourse,
  useGetCourseComments,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
import { useEffect, useState } from "react";
import Comments from "@/components/molecules/comments/Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Buttons/Button";
import formDataConverter from "@/core/utils/formDataConvertor";
import Border from "@/components/atoms/Border/Border";

const CommentsPage = () => {
  const validationSchema = Yup.object({
    Title: Yup.string().required("فیلد خالی است"),
    Describe: Yup.string().required("فیلد خالی است"),
  });

  const { id } = useParams();
  const { isLoading, data: CourseComments, refetch } = useGetCourseComments(id);
  const queryClient = useQueryClient();

  const [isCommentOpen, setIsCommentOpen] = useState(false);

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
    <>
      <div
        className={`flex flex-col gap-12 bg-default-light sm:p-8 p-4 rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
      >
        <div className={`flex flex-col xl:gap-6 gap-4`}>
          <div className={`flex gap-2`}>
            <span
              className={`text-default-black xl:text-[18px] text-base font-bold`}
            >
              همه ی نظرات
            </span>
            <div className={`xl:size-6 size-5 rounded-full bg-light-gray`}>
              <p
                className={`size-fit mx-auto xl:text-base text-[14px] font-normal text-default-black`}
              >
                {CourseComments?.data?.length}
              </p>
            </div>
          </div>
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
            }}
          >
            {({ errors }) => (
              <Form className={`flex flex-col gap-4`}>
                <div className={`flex flex-col xl:gap-4 gap-3`}>
                  <span
                    className={`xl:text-base text-[14px] font-bold text-default-black`}
                  >
                    عنوان دیدگاه
                  </span>
                  <FormInput
                    isComment={true}
                    error={errors.Title}
                    name={"Title"}
                    type={"text"}
                    placeholder={"عنوان دیدگاه خود را بنویسید"}
                    className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                    errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  />
                </div>
                <div className={`flex flex-col xl:gap-4 gap-3`}>
                  <span
                    className={`xl:text-base text-[14px] font-bold text-default-black`}
                  >
                    متن دیدگاه
                  </span>
                  <TextAreaInput
                    name={"Describe"}
                    error={errors.Describe}
                    type={"text"}
                    placeholder={"متن دیدگاه خود را بنویسید"}
                    fieldClassName={`xl:min-h-51! lg:min-h-40! min-h-20 xl:max-h-55 lg:max-h-45 max-h-30`}
                  />
                </div>
                <Button color={"authBtn"} className={`w-full py-3`}>
                  اضافه کردن نظر
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        {!isLoading && CourseComments?.data?.length !== 0 && (
          <div className={`flex flex-col xl:gap-4 gap-3`}>
            {!isLoading && CourseComments?.data?.length > 3 && !isCommentOpen
              ? CourseComments?.data?.slice(0, 3)?.map((value, index) => (
                  <>
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
                    {index !== CourseComments?.data?.length - 1 && (
                      <Border
                        width="w-full"
                        height="h-0.5"
                        backgroundColor="bg-light-gray"
                      />
                    )}
                  </>
                ))
              : CourseComments?.data?.map((value, index) => (
                  <>
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
                    {index !== CourseComments?.data?.length - 1 && (
                      <Border
                        width="w-full"
                        height="h-0.5"
                        backgroundColor="bg-light-gray"
                      />
                    )}
                  </>
                ))}
          </div>
        )}
      </div>
      {CourseComments?.data?.length > 3 && (
        <Button
          color={"moreBtn"}
          onClick={() => setIsCommentOpen(!isCommentOpen)}
          className={`h-10 w-fit px-2 mx-auto cursor-pointer`}
        >
          {!isCommentOpen ? "نمایش بیشتر" : "نمایش کمتر"}
        </Button>
      )}
    </>
  );
};

export default CommentsPage;
