import Button from "@/components/atoms/Buttons/Button";
import FormInput from "@/components/molecules/Inputs/FormInput";
import { changePassword } from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ChangePassword = () => {
  const { t } = useI18n();
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required(
      t("userPanel.changePassword.passwordErrorMessage"),
    ),
    newPassword: Yup.string()
      .min(8, t("userPanel.changePassword.newPasswordErrorMessageMin"))
      .required(t("userPanel.changePassword.newPasswordErrorMessage")),
  });

  const { mutate: updateChangePassword } = useMutation({
    mutationFn: changePassword,
    onSuccess: (result, values) => {
      if (result?.data?.success) {
        if (result?.status != 400) {
          toast.success(result?.data?.message);
          values.oldPassword = "";
          values.newPassword = "";
        } else {
          toast.error(result?.data?.message);
        }
      } else {
        toast.error(result?.data?.message);
      }
    },
  });

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        updateChangePassword(values);
      }}
    >
      {({ errors }) => (
        <Form className={`flex flex-col gap-10`}>
          <div className={`grid xl:grid-cols-2 grid-cols-1 gap-x-20 gap-y-6`}>
            <div className={`flex flex-col gap-4`}>
              <span
                className={`sm:text-base text-[14px] font-normal text-default-black`}
              >
                {t("userPanel.changePassword.password")}
              </span>
              <FormInput
                type="password"
                name="oldPassword"
                id="oldPassword"
                error={errors?.oldPassword}
                lightTheme={true}
                className={`sm:h-15! h-12!`}
                inputClassName={`sm:text-base! text-[14px]!`}
                placeholder={t("userPanel.changePassword.passwordPlaceHolder")}
              />
            </div>
            <div className={`flex flex-col gap-4`}>
              <span
                className={`sm:text-base text-[14px] font-normal text-default-black`}
              >
                {t("userPanel.changePassword.newPassword")}
              </span>
              <FormInput
                type="password"
                name="newPassword"
                id="newPassword"
                error={errors?.newPassword}
                lightTheme={true}
                className={`sm:h-15! h-12!`}
                inputClassName={`sm:text-base! text-[14px]!`}
                placeholder={t(
                  "userPanel.changePassword.newPasswordPlaceHolder",
                )}
              />
            </div>
          </div>
          <Button
            color={"panelBtn"}
            className={`h-12 sm:w-34.5 w-30 sm:text-base! text-[14px]!`}
          >
            {t("userPanel.changePassword.buttonChangePassword")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
