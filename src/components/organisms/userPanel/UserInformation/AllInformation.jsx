import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import { Skeleton } from "@/components/ui/skeleton";
import {
  updateProfileDetail,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import userProfile from "/Profile.png";
import { Pencil } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { ErrorMessage, Form, Formik } from "formik";
import FormInput from "@/components/molecules/Inputs/FormInput";
import Button from "@/components/atoms/Buttons/Button";
import SelectModal from "@/components/molecules/Select/Select";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import DatePickerInput from "@/components/molecules/DatePicker/DatePicker";
import formatDate from "@/core/utils/formatDate";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import formDataConverter from "@/core/utils/formDataConvertor";
import LoadingSvg from "@/core/icons/LoadingSvg";

const genderItems = [
  { id: 1, title: "مذکر", titleEn: "Man", name: "man" },
  { id: 2, title: "مونث", titleEn: "Woman", name: "woman" },
];

const AllInformation = () => {
  const { t } = useI18n();
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    FName: Yup.string().required(
      t("userPanel.userInfoSection.fNameErrorMessage"),
    ),
    LName: Yup.string().required(
      t("userPanel.userInfoSection.lNameErrorMessage"),
    ),
    NationalCode: Yup.string()
      .length(10, t("userPanel.userInfoSection.nationalErrorMessage10"))
      .required(t("userPanel.userInfoSection.nationalErrorMessage")),
    BirthDay: Yup.string().required(
      t("userPanel.userInfoSection.birthErrorMessage"),
    ),
    UserAbout: Yup.string().required(
      t("userPanel.userInfoSection.aboutMeErrorMessage"),
    ),
  });

  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [birthMonth, setBirthMonth] = useState(new Date().toISOString());
  const [birthValue, setBirthValue] = useState("");

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
    setBirthDate(userDetail?.data?.birthDay);
    setBirthValue(formatDate(userDetail?.data?.birthDay));
  }, [userDetail, isLoading]);
  console.log(gender);
  return isLoading ? (
    <LoadingSvg className={`h-full!`} />
  ) : (
    <Formik
      initialValues={{
        FName: userDetail?.data.fName,
        LName: userDetail?.data.lName,
        UserAbout: userDetail?.data.userAbout,
        phoneNumber: userDetail?.data.phoneNumber,
        NationalCode: userDetail?.data.nationalCode,
        BirthDay: birthDate,
        Gender: userDetail?.data?.gender ? "man" : "woman",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (values.Gender == "man") {
          values.Gender = true;
        } else if (values.Gender == "woman") {
          values.Gender = false;
        }
        const formValues = formDataConverter(values);
        updateUserInfoMutate(formValues);
        console.log(formValues);
      }}
    >
      {({ errors, values, setFieldValue }) => {
        if (values.BirthDay !== birthDate) {
          setFieldValue("BirthDay", birthDate);
        }
        if (values.Gender !== gender) {
          setFieldValue("Gender", gender);
        }
        return (
          <Form className={`flex flex-col gap-10.5`}>
            <div className={`relative size-40.5 rounded-full self-center`}>
              {isLoading ? (
                <div
                  className={`bg-field-silver p-0.5 rounded-full self-center`}
                >
                  <Skeleton className={`size-40.5`} />
                </div>
              ) : (
                <ImageFallback
                  className={`size-full rounded-full`}
                  fallback={userProfile}
                  src={userDetail?.data?.currentPictureAddress}
                />
              )}
              <div
                className={`absolute left-0 bottom-0 cursor-pointer size-12 bg-light-gray content-center rounded-full shadow-[0px_4px_4px_0px_#000000]/25 dark:shadow-[0px_4px_4px_0px_#ffffff]/25`}
              >
                <Pencil className={`mx-auto size-5`} color="#848484" />
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-x-20 gap-y-6`}>
              <div className={`flex flex-col gap-4`}>
                <span className={`text-base font-normal text-default-black`}>
                  {t("userPanel.userInfoSection.userName")}
                </span>
                <FormInput
                  type="text"
                  name="FName"
                  id="FName"
                  error={errors?.FName}
                  lightTheme={true}
                  placeholder={t("userPanel.userInfoSection.fNamePlaceHolder")}
                />
              </div>
              <div className={`flex flex-col gap-4`}>
                <span className={`text-base font-normal text-default-black`}>
                  {t("userPanel.userInfoSection.userLastName")}
                </span>
                <FormInput
                  type="text"
                  name="LName"
                  id="LName"
                  error={errors?.LName}
                  lightTheme={true}
                  placeholder={t("userPanel.userInfoSection.lNamePlaceHolder")}
                />
              </div>
              <div className={`flex flex-col gap-4`}>
                <span className={`text-base font-normal text-default-black`}>
                  {t("userPanel.userInfoSection.nationalCode")}
                </span>
                <FormInput
                  name="NationalCode"
                  id="NationalCode"
                  error={errors?.NationalCode}
                  lightTheme={true}
                  type={"number"}
                  pattern="/^[0-9]$/"
                  placeholder={t(
                    "userPanel.userInfoSection.nationalPlaceHolder",
                  )}
                />
              </div>
              <div className={`flex flex-col gap-4`}>
                <span className={`text-base font-normal text-default-black`}>
                  {t("userPanel.userInfoSection.gender")}
                </span>
                <SelectModal
                  items={genderItems}
                  contentPosition={"popper"}
                  contentClassName={`${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
                  itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-10! cursor-pointer!`}
                  value={gender ?? undefined}
                  triggerClassName={`w-full! h-15! rounded-2xl! cursor-pointer bg-default-light! text-default-black! ring-0! border border-light-gray`}
                  setValue={setGender}
                  onValueChange={setGender}
                  placeHolder="انتخاب کنید"
                />
              </div>
              <div className={`flex flex-col gap-4`}>
                <span className={`text-base font-normal text-default-black`}>
                  {t("userPanel.userInfoSection.birthDate")}
                </span>
                <DatePickerInput
                  date={birthDate}
                  setDate={(val) =>
                    setBirthDate(val instanceof Date ? val.toISOString() : null)
                  }
                  month={birthMonth}
                  setMonth={(val) =>
                    setBirthMonth(
                      val instanceof Date
                        ? val.toISOString()
                        : new Date().toISOString(),
                    )
                  }
                  value={birthValue}
                  setValue={(val) => setBirthValue(val)}
                  onChange={(date) => {
                    if (!date) {
                      setBirthDate(null);
                      setBirthValue("");
                      return;
                    }
                    setBirthDate(date.toISOString());
                    setBirthValue(formatDate(date));
                  }}
                  className={`bg-default-light! border-light-gray! h-15!`}
                  captionLayout="dropdown"
                />
                <ErrorMessage
                  name={"BirthDay"}
                  component={"span"}
                  className={`text-red-error text-[14px] font-normal`}
                />
              </div>
              <div className={`flex flex-col gap-4`}>
                <span className={`text-base font-normal text-default-black`}>
                  {t("userPanel.userInfoSection.aboutMe")}
                </span>
                <FormInput
                  name="UserAbout"
                  id="UserAbout"
                  error={errors?.UserAbout}
                  lightTheme={true}
                  type={"text"}
                  placeholder={t(
                    "userPanel.userInfoSection.aboutMePlaceHolder",
                  )}
                />
              </div>
              <Button color={"panelBtn"} className={`h-12 w-34.5`}>
                {t("userPanel.changes")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AllInformation;
