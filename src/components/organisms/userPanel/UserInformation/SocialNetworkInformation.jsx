import Button from "@/components/atoms/Buttons/Button";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import FormInput from "@/components/molecules/Inputs/FormInput";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  updateProfileDetail,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import formDataConverter from "@/core/utils/formDataConvertor";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const SocialNetworkInformation = () => {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    TelegramLink: Yup.string().required(
      t("userPanel.socialMedia.telegramErrorMessage"),
    ),
    LinkdinProfile: Yup.string().required(
      t("userPanel.socialMedia.linkedinErrorMessage"),
    ),
  });

  const [checked, setChecked] = useState(false);

  const { isLoading, data: userDetail } = useGetUserDetail();
  const { mutate: updateUserInfoMutate } = useMutation({
    mutationFn: updateProfileDetail,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`UserDetail`] });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
  });

  useEffect(() => {
    setChecked(userDetail?.data.receiveMessageEvent);
  }, [isLoading, userDetail]);
  return isLoading ? (
    <LoadingSvg className={`h-full!`} />
  ) : (
    <Formik
      initialValues={{
        TelegramLink: userDetail?.data.telegramLink ?? "",
        LinkdinProfile: userDetail?.data.linkdinProfile ?? "",
        ReceiveMessageEvent: userDetail?.data.receiveMessageEvent ?? "",
        BirthDay: userDetail?.data.birthDay ?? "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = formDataConverter(values);
        updateUserInfoMutate(formData);
      }}
    >
      {({ errors, values, setFieldValue }) => {
        const newValue = checked;
        if (values.ReceiveMessageEvent !== checked) {
          setFieldValue("ReceiveMessageEvent", newValue);
        }
        return (
          <Form className={`flex flex-col gap-10`}>
            <div className={`grid xl:grid-cols-2 grid-cols-1 gap-x-20 gap-y-6`}>
              <div className={`flex flex-col gap-4`}>
                <span
                  className={`sm:text-base text-[14px] font-normal text-default-black`}
                >
                  {t("userPanel.socialMedia.telegram")}
                </span>
                <FormInput
                  type="text"
                  name="TelegramLink"
                  id="TelegramLink"
                  error={errors?.TelegramLink}
                  lightTheme={true}
                  className={`sm:h-15! h-12!`}
                  inputClassName={`sm:text-base! text-[14px]!`}
                  placeholder={t("userPanel.socialMedia.telegramPlaceHolder")}
                />
              </div>
              <div className={`flex flex-col gap-4`}>
                <span
                  className={`sm:text-base text-[14px] font-normal text-default-black`}
                >
                  {t("userPanel.socialMedia.linkedin")}
                </span>
                <FormInput
                  type="text"
                  name="LinkdinProfile"
                  id="LinkdinProfile"
                  error={errors?.LinkdinProfile}
                  lightTheme={true}
                  className={`sm:h-15! h-12!`}
                  inputClassName={`sm:text-base! text-[14px]!`}
                  placeholder={t("userPanel.socialMedia.linkedinPlaceHolder")}
                />
              </div>
              <CheckBox
                labelId={"ReceiveMessageEvent"}
                id={"ReceiveMessageEvent"}
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
                label={t("userPanel.socialMedia.receiveEvents")}
              />
            </div>
            <Button
              color={"panelBtn"}
              className={`h-12 sm:w-34.5 w-30 sm:text-base! text-[14px]!`}
            >
              {t("userPanel.changesInfo")}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SocialNetworkInformation;
