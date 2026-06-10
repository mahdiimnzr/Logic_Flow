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
const ContactUs = () => {
  return (
    <div className={` flex flex-col gap-[52px]`}>
      <div className=" relative">
        <img src={image} className={`size-full`} />
        <div className={` flex flex-col gap-2 absolute top-40 right-40`}>
          <span className={` text-[32px] text-default-light font-bold`}>
            تماس با ما
          </span>
          <p className={`text-default-light font-light`}>
            می‌توانید از طریق فرم تماس در همین صفحه پیام خود را برای ما ارسال
            کنید.{" "}
          </p>
        </div>
      </div>
      <div className={`flex justify-center gap-[190px]`}>
        <div className={`flex flex-col gap-5`}>
          <div>
            <p className={`text-[36px] text-default-black font-bold w-145`}>
              به کمک نیاز دارید؟ ما اینجاییم! فرم زیر را پر کنید تا سریعاً با
              شما <span className={`text-green-primary`}>تماس بگیریم</span>
            </p>
            <p className={`text-default-black w-146 leading-10`}>
              ما اینجاییم تا به شما کمک کنیم بهترین تصمیم را بگیرید. اگر به
              دنبال خدمات حرفه‌ای، قیمت‌گذاری شفاف و پشتیبانی سریع هستید، کافیست
              فرم را تکمیل کنید تا کارشناسان ما در سریع‌ترین زمان ممکن با شما
              تماس بگیرند. فرقی نمی‌کند که سوال دارید، نیاز به راهنمایی دارید یا
              می‌خواهید قیمت دقیق خدمات ما را بدانید — تیم ما آماده است تا با
              ارائه مشاوره رایگان، مسیر را برایتان روشن‌تر کند. با تکمیل فرم
              زیر، بدون هیچ‌گونه تعهدی می‌توانید اطلاعات لازم را دریافت کرده و
              با خیال راحت انتخاب کنید.
            </p>
          </div>
          <div className={`flex flex-col gap-4`}>
            <div className={`flex items-center gap-4`}>
              <div className={`size-11.25 bg-green-primary rounded-full`}>
                <PhoneContacts className={` m-auto mt-3 `} />
              </div>
              <span className={`text-default-black text-[18px] font-bold`}>
                011-123-45-678
              </span>
            </div>
            <div className={`flex items-center gap-4`}>
              <div className={`size-11.25 bg-green-primary rounded-full`}>
                <EmailContacts className={` m-auto mt-3 `} />
              </div>
              <span className={`text-default-black text-[18px] font-bold`}>
                yourEmailAddress@gmail.com
              </span>
            </div>
          </div>
        </div>
        <div
          className={`md:min-h-auto bg-default-light w-3/11 p-9  md:rounded-[25px] rounded-[30px] shadow-[2px_4px_8px_0px_#000000]/15 dark:shadow-[2px_4px_8px_0px_#ffffff]/15`}
        >
          <Formik>
            <Form>
              <div className={`flex flex-col xl:gap-10 lg:gap-5 gap-3`}>
                <FormInput
                  icon={<HumanIcon className={`lg:size-5 size-3`} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder="نام و نام خانوادگی"
                  className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                />
                <FormInput
                  icon={<EmailIcon className={`lg:size-5 size-3`} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder="ایمیل خود را وارد کنید"
                  className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                />
                <FormInput
                  icon={<PhoneCantcats2 className={`lg:size-5 size-3`} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder="شماره تماس"
                  className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                />
                <FormInput
                  icon={<Messages className={`lg:size-5 size-3`} />}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder="متن پیام"
                  className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                />

                <Button color={"authBtn"} className={`h-[60px]`}>
                  ارسال
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
