import Button from "@/components/atoms/Buttons/Button";
import FormInput from "@/components/molecules/Inputs/FormInput";
import CheckBox from "@/components/molecules/Inputs/CheckBox";
import HumanIcon from "@/core/icons/HumanIcon";
import KeyIcon from "@/core/icons/KeyIcon";
import { Formik, Form } from "formik";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAccount } from "@/core/services/api/userPanel/userPanel.service";
import { toast } from "react-toastify";
import LoginContext from "@/app/context/LoginContext";
import { useI18n } from "@/i18n/useI18n";

const AddMultiAccountModal = ({ isOpen, setIsOpen, setMultiModal }) => {
  const { t } = useI18n();
  const [checked, setChecked] = useState(false);
  const queryClient = useQueryClient();

  const { setIsLogin } = useContext(LoginContext);

  const { mutate: addAccountMutate } = useMutation({
    mutationFn: addAccount,
    onMutate: () => {
      const toastId = toast.loading(t("userPanel.loading"));
      return { toastId };
    },
    onSuccess: (response, values, context) => {
      toast.dismiss(context.toastId);
      if (response.data.success) {
        toast.success(response.data.message, { id: context.toastId });
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }
        setIsLogin(true);
        queryClient.invalidateQueries({
          queryKey: ["MultiAccount"],
        });
        setIsOpen(false);
        setMultiModal(true);
        values.phoneOrGmail = "";
        values.password = "";
        values.rememberMe = false;
      } else if (!response.data.success) {
        toast.error(response.data.message, { id: context.toastId });
      }
    },
    onError: (response, _, context) => {
      toast.dismiss(context.toastId);
      toast.error(response.data.message, { id: context.toastId });
    },
  });

  const handleSubmit = (values) => {
    addAccountMutate(values);
  };

  const validationSchema = Yup.object({
    phoneOrGmail: Yup.string().required(
      t("userPanel.multiAccounts.emailOrPhoneRequired"),
    ),
    password: Yup.string()
      .min(6, t("userPanel.multiAccounts.passwordMin"))
      .required(t("userPanel.multiAccounts.passwordRequired")),
  });

  return (
    <Formik
      initialValues={{
        phoneOrGmail: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, values, setFieldValue }) => {
        if (values.rememberMe !== checked) {
          setFieldValue("rememberMe", checked);
        }

        return (
          <Form>
            <div
              className={`size-full fixed transition-all ${
                isOpen ? "visible opacity-100" : "invisible opacity-0"
              } right-0 top-0 z-100 flex items-center justify-center`}
            >
              <div className="size-full absolute top-0 right-0 bg-black/40 backdrop-blur-sm"></div>
              <div
                className={`${
                  isOpen ? "mt-0" : "mt-10"
                } transition-all sm:p-8 p-5 bg-default-light rounded-[24px] relative lg:w-112.5 sm:120 w-[90%] flex flex-col gap-8`}
              >
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 left-6 cursor-pointer"
                >
                  <X className="text-default-black" size={22} />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-default-black text-[20px] font-medium">
                    {t("userPanel.multiAccounts.addAccount")}
                  </span>

                  <span className="text-field-silver text-[14px] text-center">
                    {t("userPanel.multiAccounts.enterAccountInfo")}
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  <FormInput
                    icon={<HumanIcon />}
                    error={errors.phoneOrGmail}
                    name="phoneOrGmail"
                    type="text"
                    placeholder={t("userPanel.multiAccounts.emailOrPhone")}
                  />

                  <FormInput
                    icon={<KeyIcon />}
                    error={errors.password}
                    name="password"
                    type="password"
                    placeholder={t("userPanel.multiAccounts.password")}
                  />

                  <CheckBox
                    labelId="rememberMe"
                    id="rememberMe"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    label={t("userPanel.multiAccounts.rememberMe")}
                  />

                  <Button color="panelBtn" className="w-full sm:py-3 py-2.5">
                    {t("userPanel.multiAccounts.addAccount")}
                  </Button>

                  <div
                    onClick={() => {
                      setIsOpen(false);
                      setMultiModal(true);
                    }}
                    className="w-full sm:py-3 py-1 border border-field-silver rounded-[16px] text-field-silver text-center cursor-pointer transition-all"
                  >
                    {t("userPanel.myCoursesSection.cancel")}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddMultiAccountModal;
