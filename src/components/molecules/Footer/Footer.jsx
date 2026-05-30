import InstagramIcon from "@/core/icons/InstagramIcon";
import SearchHeader from "../Inputs/SearchHeader";
import FaceBookIcon from "@/core/icons/FaceBookIcon";
import TwitterIcon from "@/core/icons/TwitterIcon";
import TelegramIcon from "@/core/icons/TelegramIcon";
import WhatsAppIcon from "@/core/icons/WhatsAppIcon";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`py-12 px-6 bg-green-primary rounded-t-[50px] flex flex-col gap-14`}
    >
      <div className={`flex flex-col gap-8`}>
        <div
          className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0`}
        >
          <h3
            className={`md:w-4/10 w-full text-default-light font-bold xl:text-4xl lg:text-2xl text-[20px] leading-loose`}
          >
            از جدیدترین اخبار و دوره های برنامه ‌نویسی باخبر شوید
          </h3>
          <div
            className={`2xl:w-3/10 lg:w-4/10 md:w-5/10 w-full flex flex-col gap-5`}
          >
            <SearchHeader
              placeHolder={"شماره تماس خود را وارد کنید"}
              buttonClassName={`lg:px-5 lg:py-3 md:px-4 py-2 px-3 md:text-[14px]! text-[12px]! text-default-light!`}
              inputClassName={`xl:w-7/10 md:w-6/10 w-7/10`}
              color={"registerBtn"}
              className={`lg:w-80 md:w-70 w-60`}
            >
              ثبت نام
            </SearchHeader>
            <p className={`text-[#C8C8C8] text-[12px] font-normal`}>
              عضویت در خبرنامه‌ی وب‌سایت برنامه‌نویسی برای اطلاع از مقالات،
              دوره‌ها و تخفیف‌ها.
            </p>
          </div>
        </div>
        <div className={`grid lg:grid-cols-4 md:grid-cols-2 gap-8`}>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-default-light font-bold pb-4 border-b border-green-primary`}
            >
              تخصص‌ها
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-default-light`}>
                HTML & CSS
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                JavaScript
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                React
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                Next.js
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                Node.js
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                REST API
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                Git & GitHub
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-default-light font-bold pb-4 border-b border-green-primary`}
            >
              درباره ما
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-default-light`}>
                اخبار
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                فرصت‌های شغلی
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                تماس با ما
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                مرکز اعتماد
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                قوانین استفاده
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                سیاست امنیت
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                حریم خصوصی
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-default-light font-bold pb-4 border-b border-green-primary`}
            >
              حوزه‌های کاربردی
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-default-light`}>
                فرانت‌اند
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                بک‌اند
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                فول‌استک
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                هوش مصنوعی
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                سئو و بهینه‌سازی
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                طراحی UI/UX
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                موبایل
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-default-light font-bold pb-4 border-b border-green-primary`}
            >
              آموزش و پشتیبانی
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-default-light`}>
                رویدادها
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                پنل کاربری
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                پشتیبانی فنی
              </span>
              <span className={`text-[14px] font-normal text-default-light`}>
                مقالات آموزشی
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex items-center justify-between px-4`}>
        <h1 className={`text-default-light lg:text-[18px] text-base font-bold`}>
          آکادمی بحر
        </h1>
        <p
          className={`text-default-light lg:text-[14px] text-[12px] font-normal hidden md:block`}
        >
          © 2026 تمام حقوق برای آکادمی بحر محفوظ است.
        </p>
        <div className={`flex items-center lg:gap-6 gap-4`}>
          <InstagramIcon color={theme ? "#1E1E1E" : "white"} />
          <FaceBookIcon color={theme ? "#1E1E1E" : "white"} />
          <TwitterIcon color={theme ? "#1E1E1E" : "white"} />
          <TelegramIcon color={theme ? "#1E1E1E" : "white"} />
          <WhatsAppIcon color={theme ? "#1E1E1E" : "white"} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
