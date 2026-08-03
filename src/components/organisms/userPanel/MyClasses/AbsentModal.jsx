import Button from "@/components/atoms/Buttons/Button";
import FormInput from "@/components/molecules/Inputs/FormInput";
import { addAbsentStatus } from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AbsentModal = ({ isOpen, setIsOpen, props }) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    absentReason: Yup.string()
      .trim()
      .required(t("userPanel.myClass.absentReasonRequired")),
  });

  const { mutate: absentStatusMutate } = useMutation({
    mutationFn: (params) =>
      toast.promise(addAbsentStatus(params), {
        pending: "در حال ثبت وضعیت",
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
    onSuccess: (response, values) => {
      if (response.data.success) {
        queryClient.invalidateQueries({
          queryKey: ["MyClasses"],
        });
        setIsOpen(false);
        values.absentReason = "";
        values.sessionId = "";
      } else if (!response.data.success) {
        toast.error(response.data.message);
      }
    },
  });
  return (
    <div
      className={`size-full fixed transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"} right-0 top-0 z-100 flex items-center justify-center`}
    >
      <div
        className={`size-full absolute top-0 right-0 bg-black/50 backdrop-blur-[2px]`}
      ></div>
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all sm:p-8 p-4 bg-default-light rounded-[24px] relative xl:w-4/10 sm:w-7/10 w-8/10 max-h-[calc(100vh-64px)] overflow-y-auto no-scrollbar flex flex-col items-center gap-8`}
      >
        <div className={`flex flex-col gap-5 w-full max-h-100 overflow-y-auto`}>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
              sessionId: props.SessionId,
              present: false,
              studentHand: false,
              absentReason: "",
            }}
            onSubmit={(values) => {
              const value = {
                sessionId: values.sessionId,
                present: values.present,
                studentHand: values.studentHand,
                absentReason: values.absentReason.trim(),
              };
              absentStatusMutate(value);
            }}
          >
            {({ errors }) => (
              <Form>
                <div className={`flex flex-col gap-3 justify-between pb-4`}>
                  <p className={`text-default-black text-base font-medium`}>
                    {t("userPanel.myClass.absentReason")}
                  </p>
                  <FormInput
                    error={errors.absentReason}
                    name="absentReason"
                    type="text"
                    lightTheme={true}
                    className={`sm:h-15! h-12!`}
                    inputClassName={`sm:text-base! text-[14px]!`}
                    placeholder={t("userPanel.myClass.absentReasonPlaceHolder")}
                  />
                </div>
                <div className={`flex flex-col gap-3 justify-between pb-4`}>
                  <div className={`w-full flex justify-between`}>
                    <Button color={"panelBtn"} className={`px-4 py-2.5`}>
                      {t("userPanel.myClass.commitStatus")}
                    </Button>
                    <div
                      onClick={() => setIsOpen(false)}
                      className={`cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver text-base font-normal`}
                    >
                      {t("userPanel.myCoursesSection.cancel")}
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AbsentModal;
