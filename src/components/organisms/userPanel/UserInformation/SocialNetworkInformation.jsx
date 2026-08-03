import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import FormInput from "@/components/molecules/Inputs/FormInput";
import { useTourControl } from "@/components/molecules/TourStep/TourProvider";
import { getTourStyles } from "@/components/molecules/TourStep/tourStyles";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  updateProfileDetail,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import formDataConverter from "@/core/utils/formDataConvertor";
import { useI18n } from "@/i18n/useI18n";
import { TourProvider, useTour } from "@reactour/tour";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
const SocialNetworkInformationContent = () => {
  const { openRef } = useTourControl();
  const { setIsOpen, setSteps } = useTour();
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
    mutationFn: (value) =>
      toast.promise(updateProfileDetail(value), {
        pending: "در حال بروزرسانی اطلاعات",
        success: {
          render({ data }) {
            return data.data.message;
          },
        },
        error: {
          render({ data }) {
            return data.data.message;
          },
        },
      }),
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
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
    openRef.current = setIsOpen;
    setSteps([
      {
        selector: '[data-tour="step1"]',
        content: t("userPanel.SocialNetworkInformation.step1"),
      },
    ]);
  }, [t]);

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
            <div className={`w-fit `} data-tour="step1">
              <Button
                color={"panelBtn"}
                className={`h-12 sm:w-34.5 w-30 sm:text-base! text-[14px]!`}
              >
                {t("userPanel.changesInfo")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const LocationInformation = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useI18n();
  return (
    <TourProvider key={lang} steps={[]} styles={getTourStyles(theme, lang)}>
      <SocialNetworkInformationContent />
    </TourProvider>
  );
};

export default LocationInformation;
