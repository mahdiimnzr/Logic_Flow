import FormInput from "@/components/molecules/Inputs/FormInput";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Buttons/Button";
import Border from "@/components/atoms/Border/Border";
import {
  postAddCommentsNews,
  useGetNewsComments,
} from "@/core/services/api/newsDetails/newsDetails.service";
import Comments from "./Comments";
import { useI18n } from "@/i18n/useI18n";
import { useGetUserDetail } from "@/core/services/api/userPanel/userPanel.service";

const NewsComments = () => {
  const { t } = useI18n();
  const validationSchema = Yup.object({
    title: Yup.string().required(t("newsDetail.inputsError")),
    describe: Yup.string().required(t("newsDetail.inputsError")),
  });

  const { id } = useParams();
  const { data: userDetail } = useGetUserDetail();
  const { isLoading, data: newsComments, refetch } = useGetNewsComments(id);
  const queryClient = useQueryClient();

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const { mutate: addNewsCommentMutate } = useMutation({
    mutationFn: postAddCommentsNews,
    onSuccess: (result, values) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`newsComments${id}`] });
        values.title = "";
        values.describe = "";
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
              {t("newsDetail.allComments")}
            </span>
            <div className={`xl:size-6 size-5 rounded-full bg-light-gray`}>
              <p
                className={`size-fit mx-auto xl:text-base text-[14px] font-normal text-default-black`}
              >
                {newsComments?.data?.length}
              </p>
            </div>
          </div>
          <Formik
            initialValues={{
              newsId: id,
              userIpAddress: null,
              title: "",
              describe: "",
              userId: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              addNewsCommentMutate(values);
            }}
          >
            {({ errors }) => (
              <Form className={`flex flex-col gap-4`}>
                <div className={`flex flex-col xl:gap-4 gap-3`}>
                  <span
                    className={`xl:text-base text-[14px] font-bold text-default-black`}
                  >
                    {t("newsDetail.commentTitle")}
                  </span>
                  <FormInput
                    isComment={true}
                    error={errors.title}
                    name={"title"}
                    type={"text"}
                    placeholder={t("newsDetail.commentTitlePlaceHolder")}
                    className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                    errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  />
                </div>
                <div className={`flex flex-col xl:gap-4 gap-3`}>
                  <span
                    className={`xl:text-base text-[14px] font-bold text-default-black`}
                  >
                    {t("newsDetail.commentDescribe")}
                  </span>
                  <TextAreaInput
                    name={"describe"}
                    error={errors.describe}
                    type={"text"}
                    placeholder={t("newsDetail.commentDescribePlaceHolder")}
                    fieldClassName={`xl:min-h-51! lg:min-h-40! min-h-20 xl:max-h-55 lg:max-h-45 max-h-30`}
                  />
                </div>
                <Button color={"authBtn"} className={`w-full py-3`}>
                  {t("newsDetail.addComment")}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className={`flex flex-col xl:gap-4 gap-3`}>
          {!isLoading && newsComments?.data?.length > 3 && !isCommentOpen
            ? newsComments?.data?.slice(0, 3)?.map((value, index) => (
                <>
                  <Comments
                    key={index}
                    author={value.userFullName}
                    commentId={value.id}
                    title={value.title}
                    pictureAddress={value?.user?.currentPictureAddress}
                    describe={value.describe}
                    likeCount={value.likeCount}
                    disslikeCount={value.dissLikeCount}
                    insertDate={value.inserDate}
                    currentUserIsDissLike={value.currentUserIsDissLike}
                    currentUserIsLike={value.currentUserIsLike}
                    currentUserLikeId={value.currentUserLikeId}
                    userId={value.userId}
                    currentUserId={userDetail?.data.id}
                  />
                  {index !== newsComments?.data?.length - 1 && (
                    <Border
                      width="w-full"
                      height="h-0.5"
                      backgroundColor="bg-light-gray"
                    />
                  )}
                </>
              ))
            : newsComments?.data?.map((value, index) => (
                <>
                  <Comments
                    key={index}
                    author={value.userFullName}
                    commentId={value.id}
                    title={value.title}
                    pictureAddress={value?.user?.currentPictureAddress}
                    describe={value.describe}
                    likeCount={value.likeCount}
                    disslikeCount={value.dissLikeCount}
                    insertDate={value.inserDate}
                    currentUserIsDissLike={value.currentUserIsDissLike}
                    currentUserIsLike={value.currentUserIsLike}
                    currentUserLikeId={value.currentUserLikeId}
                    userId={value.userId}
                    currentUserId={userDetail?.data.id}
                  />
                  {index !== newsComments?.data?.length - 1 && (
                    <Border
                      width="w-full"
                      height="h-0.5"
                      backgroundColor="bg-light-gray"
                    />
                  )}
                </>
              ))}
        </div>
      </div>
      {newsComments?.data?.length > 3 && (
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

export default NewsComments;
