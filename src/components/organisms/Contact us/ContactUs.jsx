import PhoneContacts from "@/core/icons/PhoneContacts";
import image from "../../../assets/images/contact .png";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import HumanIcon from "@/core/icons/HumanIcon";
import FormInput from "@/components/molecules/Inputs/FormInput";
import EmailIcon from "@/core/icons/EmailIcon";
import EmailContacts from "@/core/icons/EmailContacts";
import PhoneCantcats2 from "@/core/icons/PhoneCantcats2";
import Messages from "@/core/icons/Messages";
import Button from "@/components/atoms/Buttons/Button";
import { useI18n } from "@/i18n/useI18n";
const ContactUs = () => {
  const { t } = useI18n();
  return (
    <div className={` flex flex-col gap-13`}>
      <div className="relative">
        <img src={image} className={`size-full lg:h-full sm:h-50 h-40`} />
        <div
          className={`lg:px-20 md:px-10 px-8 flex flex-col justify-center gap-2 absolute top-0 right-0 size-full bg-black/50`}
        >
          <span
            className={`text-white lg:text-[32px] md:text-[25px] text-[19px] font-bold`}
          >
            {t("contactUs.titleImage1")}
          </span>
          <span
            className={`text-white font-light lg:text-base md:text-[14px] sm:text-[12px] text-[10px]`}
          >
            {t("contactUs.titleImage2")}
          </span>
        </div>
      </div>
      <div
        className={`flex lg:flex-row flex-col justify-center items-center xl:gap-47.5 lg:gap-22 gap-12`}
      >
        <div className={`flex flex-col gap-5`}>
          <div>
            <p
              className={`md:text-[36px] sm:text-[32px] text-[17px] text-default-black font-bold md:w-145 sm:w-125 w-75 `}
            >
              {t("contactUs.title")}
              شما{" "}
              <span className={`text-green-primary`}>
                {" "}
                {t("contactUs.spanTitle")}
              </span>
            </p>
            <p
              className={`text-default-black md:w-146 sm:w-130 w-73 md:leading-10 sm:leading-9 leading-7 sm:text-base text-[14px]   `}
            >
              {t("contactUs.description")}
            </p>
          </div>
          <div className={`flex flex-col gap-4`}>
            <div className={`flex items-center gap-4`}>
              <div
                className={`md:size-11.25 size-10 bg-green-primary rounded-full`}
              >
                <PhoneContacts className={`m-auto mt-3 md:size-5 size-4.5`} />
              </div>
              <span
                className={`text-default-black md:text-[18px] text-[16px] font-bold`}
              >
                {t("contactUs.phone")}
              </span>
            </div>
            <div className={`flex items-center gap-4`}>
              <div
                className={`md:size-11.25 size-10 bg-green-primary rounded-full`}
              >
                <EmailContacts className={`m-auto mt-3 md:size-5 size-4.5`} />
              </div>
              <span
                className={`text-default-black md:text-[18px] text-[16px] font-bold`}
              >
                {t("contactUs.email")}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`h-fit bg-default-light lg:w-3/11 sm:w-8/11 w-10/11 xl:p-9 lg:p-6 md:p-9 sm:p-5 p-4 md:rounded-[25px] rounded-[30px] shadow-[2px_4px_8px_0px_#000000]/15 dark:shadow-[2px_4px_8px_0px_#ffffff]/15`}
        >
          <Formik>
            <Form>
              <div
                className={`flex flex-col xl:gap-10 lg:gap-5 md:gap-10 sm:gap-5 gap-2.5 `}
              >
                <FormInput
                  icon={<HumanIcon className={``} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder={t("contactUs.namePlaceHolder")}
                  className={`xl:h-15! lg:h-13! sm:h-15! h-13!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  inputClassName={` sm:text-[14px]! text-[12px]! `}
                />
                <FormInput
                  icon={<EmailIcon className={``} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder={t("contactUs.emailPlaceHolder")}
                  className={`xl:h-15! lg:h-13! sm:h-15! h-13!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  inputClassName={` sm:text-[14px]! text-[12px]! `}
                />
                <FormInput
                  icon={<PhoneCantcats2 className={``} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder={t("contactUs.phonePlaceHolder")}
                  className={`xl:h-15! lg:h-13! sm:h-15! h-13!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  inputClassName={` sm:text-[14px]! text-[12px]! `}
                />
                <FormInput
                  icon={<Messages className={``} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder={t("contactUs.massagesPlaceHolder")}
                  className={`xl:h-15! lg:h-13! sm:h-15! h-13!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  inputClassName={` sm:text-[14px]! text-[12px]! `}
                />

                <Button
                  color={"authBtn"}
                  className={`xl:h-15! lg:h-13! sm:h-15! h-10!`}
                >
                  {t("contactUs.send")}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
