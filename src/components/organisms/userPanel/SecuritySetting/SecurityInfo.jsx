import ThemeContext from "@/app/context/ThemeContext";
import Button from "@/components/atoms/Buttons/Button";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import FormInput from "@/components/molecules/Inputs/FormInput";
import { useTourControl } from "@/components/molecules/TourStep/TourProvider";
import { getTourStyles } from "@/components/molecules/TourStep/tourStyles";
import {
  editSecurity,
  useGetSecuritySetting,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { TourProvider, useTour } from "@reactour/tour";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const SecurityInfoContent = () => {
  const { openRef } = useTourControl();
  const { setIsOpen, setSteps } = useTour();
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const validationSchema = Yup.object({
    recoveryEmail: Yup.string().required(
      t("userPanel.securityInfo.emailErrorMessage"),
    ),
    telegramUsername: Yup.string().required(
      t("userPanel.securityInfo.emailErrorMessage"),
    ),
  });

  const [checked, setChecked] = useState(false);
  const { isLoading, data: Security } = useGetSecuritySetting();
  const { mutate: updateEditSecurity } = useMutation({
    mutationFn: editSecurity,
    onSuccess: (result) => {
      if (result?.data?.success) {
        if (result?.status != 400) {
          toast.success(result?.data?.message);
          queryClient.invalidateQueries({ queryKey: [`SecuritySetting`] });
        } else {
          toast.error(result?.data?.message);
        }
      } else {
        toast.error(result?.data?.message);
      }
    },
  });

  useEffect(() => {
    openRef.current = setIsOpen;
    setSteps([
      {
        selector: '[data-tour="step1"]',
        content: t("userPanel.SecurityInfo.step1"),
      },
    ]);
  }, [t]);

  useEffect(() => {
    setChecked(Security?.data?.twoStepAuth);
  }, [isLoading, Security]);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        telegramUsername: Security?.data?.userTelegrams?.telegramId ?? "",
        twoStepAuth: undefined,
        recoveryEmail: Security?.data?.recoveryEmail ?? "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        updateEditSecurity(values);
      }}
    >
      {({ errors, setFieldValue, values }) => {
        const newValue = checked;
        if (values.twoStepAuth !== checked) {
          setFieldValue("twoStepAuth", newValue);
        }
        return (
          <Form className={`flex flex-col gap-10`}>
            <div className={`grid xl:grid-cols-2 grid-cols-1 gap-x-20 gap-y-6`}>
              <div className={`flex flex-col gap-4`}>
                <span
                  className={`sm:text-base text-[14px] font-normal text-default-black`}
                >
                  {t("userPanel.securityInfo.email")}
                </span>
                <FormInput
                  type="text"
                  name="recoveryEmail"
                  id="recoveryEmail"
                  error={errors?.recoveryEmail}
                  lightTheme={true}
                  className={`sm:h-15! h-12!`}
                  inputClassName={`sm:text-base! text-[14px]!`}
                  placeholder={t("userPanel.securityInfo.emailPlaceHolder")}
                />
              </div>
              <div className={`flex flex-col gap-4`}>
                <span
                  className={`sm:text-base text-[14px] font-normal text-default-black`}
                >
                  {t("userPanel.securityInfo.telegram")}
                </span>
                <FormInput
                  type="text"
                  name="telegramUsername"
                  id="telegramUsername"
                  error={errors?.telegramUsername}
                  lightTheme={true}
                  className={`sm:h-15! h-12!`}
                  inputClassName={`sm:text-base! text-[14px]!`}
                  placeholder={t("userPanel.securityInfo.telegramPlaceHolder")}
                />
              </div>
              <div dir="ltr" className="w-fit" data-tour="step1">
                <CheckBox
                  label={t("userPanel.securityInfo.labelCheckBox")}
                  labelId={"twoStepAuth"}
                  id={"twoStepAuth"}
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                />
              </div>
            </div>
            <div
              className={`flex sm:flex-row flex-col lg:gap-5 gap-2 xl:text-base lg:text-[15px] text-[14px]`}
            >
              {" "}
              <span className={`text-default-black cursor-pointer `}>
                {t("userPanel.securityInfo.helperText")}
              </span>
              <Link
                to={"https://t.me/ReactRHBot"}
                className={`text-green-primary underline`}
                target="blank"
              >
                {t("userPanel.securityInfo.linkText")}
              </Link>
            </div>

            <Button
              color={"panelBtn"}
              className={`h-12 sm:w-43.25 w-38 sm:text-base! text-[14px]!`}
            >
              {t("userPanel.securityInfo.buttonSaveSecuritySettings")}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

const SecurityInfo = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useI18n();
  return (
    <TourProvider key={lang} steps={[]} styles={getTourStyles(theme, lang)}>
      <SecurityInfoContent />
    </TourProvider>
  );
};

export default SecurityInfo;
