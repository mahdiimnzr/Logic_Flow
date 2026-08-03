import Button from "@/components/atoms/Buttons/Button";
import { addHomeWorkSecond } from "@/core/services/api/userPanel/userPanel.service";
import formDataConverter from "@/core/utils/formDataConvertor";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { Plus, X, File, FileText, FileSpreadsheet } from "lucide-react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const HomeWorkFile = ({ isOpen, setIsOpen, props }) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    ExersiceFiles: Yup.mixed().required(t("userPanel.homeWorks.fileReqiured")),
  });

  const { mutate: homeWorkMutate } = useMutation({
    mutationFn: (params) =>
      toast.promise(addHomeWorkSecond(params), {
        pending: "در حال ثبت فایل",
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
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({
          queryKey: ["UserHomeWorks"],
        });
        setIsOpen(false);
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
            validationSchema={validationSchema}
            initialValues={{
              ExersiceFiles: null,
            }}
            onSubmit={(values) => {
              const value = {
                CouresUserHomeWorkId: props.courseUserHomeWorkId,
                ExersiceFiles: values.ExersiceFiles,
              };
              const formData = formDataConverter(value);
              homeWorkMutate(formData);
              values.ExersiceFiles = null;
              values.CouresUserHomeWorkId = "";
            }}
          >
            {({ errors, values, setFieldValue }) => (
              <Form>
                <div className="flex flex-col gap-3 pb-4">
                  <p className="text-default-black text-base font-medium">
                    {t("userPanel.homeWorks.sendingFile")}
                  </p>

                  <div className="flex items-start gap-4">
                    <label
                      htmlFor="ExersiceFiles"
                      className="group cursor-pointer rounded-2xl border-2 border-dashed border-light-gray hover:border-primary transition-all sm:size-24 size-18 flex items-center justify-center shrink-0 bg-default-white hover:bg-primary/5"
                    >
                      <input
                        id="ExersiceFiles"
                        name="ExersiceFiles"
                        type="file"
                        className="hidden"
                        accept="
          image/*,
          application/pdf,
          .doc,.docx,
          .xls,.xlsx
        "
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            setFieldValue("ExersiceFiles", e.target.files[0]);
                          }
                        }}
                      />

                      <Plus
                        className="size-10 group-hover:scale-110 transition-transform"
                        color="#BDBDBD"
                      />
                    </label>

                    {values.ExersiceFiles && (
                      <div className="relative flex flex-col sm:flex-row gap-4 rounded-2xl border border-light-gray bg-default-white p-4 flex-1">
                        <div className="w-full sm:w-auto flex justify-center">
                          {values.ExersiceFiles.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(values.ExersiceFiles)}
                              alt="preview"
                              className="w-full sm:w-16 h-40 sm:h-16 rounded-xl object-cover border"
                            />
                          ) : values.ExersiceFiles.type ===
                            "application/pdf" ? (
                            <div className="w-full sm:w-16 h-24 sm:h-16 rounded-xl bg-red-100 flex items-center justify-center">
                              <FileText className="text-red-600" size={34} />
                            </div>
                          ) : values.ExersiceFiles.name.match(
                              /\.(doc|docx)$/i,
                            ) ? (
                            <div className="w-full sm:w-16 h-24 sm:h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                              <FileText className="text-blue-600" size={34} />
                            </div>
                          ) : values.ExersiceFiles.name.match(
                              /\.(xls|xlsx)$/i,
                            ) ? (
                            <div className="w-full sm:w-16 h-24 sm:h-16 rounded-xl bg-green-100 flex items-center justify-center">
                              <FileSpreadsheet
                                className="text-green-600"
                                size={34}
                              />
                            </div>
                          ) : (
                            <div className="w-full sm:w-16 h-24 sm:h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                              <File className="text-gray-600" size={34} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 justify-center">
                          <span className="font-medium text-default-black break-all sm:truncate">
                            {values.ExersiceFiles.name}
                          </span>

                          <span className="text-xs text-field-silver mt-1">
                            {(values.ExersiceFiles.size / 1024).toFixed(1)} KB
                          </span>

                          <span className="text-xs text-green-600 mt-2">
                            {t("userPanel.homeWorks.readyToSent")}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFieldValue("ExersiceFiles", null)}
                          className="absolute top-3 right-3 rounded-full p-1 hover:bg-red-50 transition-colors"
                        >
                          <X size={16} className="text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  {errors.ExersiceFiles && (
                    <span className="text-red-error text-sm">
                      {errors.ExersiceFiles}
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    type="submit"
                    color="panelBtn"
                    className="px-4 py-2.5"
                  >
                    {t("userPanel.myClass.commitStatus")}
                  </Button>

                  <div
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver"
                  >
                    {t("userPanel.myCoursesSection.cancel")}
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

export default HomeWorkFile;
