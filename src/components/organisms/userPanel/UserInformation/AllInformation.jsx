import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserDetail } from "@/core/services/api/userPanel/userPanel.service";
import userProfile from "/Profile.png";
import { Pencil } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { Form, Formik } from "formik";
import FormInput from "@/components/molecules/Inputs/FormInput";
import Button from "@/components/atoms/Buttons/Button";

const AllInformation = () => {
  const { t } = useI18n();
  const { isLoading, data: userDetail } = useGetUserDetail();
  return (
    <Formik
      initialValues={{
        FName: "",
        LName: "",
        NationalCode: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors }) => (
        <Form className={`flex flex-col gap-10.5`}>
          <div className={`relative size-40.5 rounded-full self-center`}>
            {isLoading ? (
              <div className={`bg-field-silver p-0.5 rounded-full self-center`}>
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
                placeholder={t("userPanel.userInfoSection.nationalPlaceHolder")}
              />
            </div>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-base font-normal text-default-black`}>
                {t("userPanel.userInfoSection.gender")}
              </span>
              <FormInput
                name="NationalCode"
                id="NationalCode"
                error={errors?.NationalCode}
                lightTheme={true}
                type={"number"}
                pattern="/^[0-9]$/"
                placeholder={t("userPanel.userInfoSection.nationalPlaceHolder")}
              />
            </div>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-base font-normal text-default-black`}>
                {t("userPanel.userInfoSection.birthDate")}
              </span>
              <FormInput
                name="NationalCode"
                id="NationalCode"
                error={errors?.NationalCode}
                lightTheme={true}
                type={"number"}
                pattern="/^[0-9]$/"
                placeholder={t("userPanel.userInfoSection.nationalPlaceHolder")}
              />
            </div>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-base font-normal text-default-black`}>
                {t("userPanel.userInfoSection.aboutMe")}
              </span>
              <FormInput
                name="aboutMe"
                id="aboutMe"
                error={errors?.aboutMe}
                lightTheme={true}
                type={"text"}
                placeholder={t("userPanel.userInfoSection.aboutMePlaceHolder")}
              />
            </div>
            <Button color={"panelBtn"} className={`h-12 w-34.5`}>
              {t("userPanel.changes")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AllInformation;
