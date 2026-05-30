import InstagramIcon from "@/core/icons/InstagramIcon";
import SearchHeader from "../Inputs/SearchHeader";
import FaceBookIcon from "@/core/icons/FaceBookIcon";
import TwitterIcon from "@/core/icons/TwitterIcon";
import TelegramIcon from "@/core/icons/TelegramIcon";
import WhatsAppIcon from "@/core/icons/WhatsAppIcon";

const Footer = () => {
  return (
    <div
      className={`py-12 px-6 bg-green-primary rounded-t-[50px] flex flex-col gap-14`}
    >
      <div className={`flex flex-col gap-8`}>
        <div
          className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0`}
        >
          <h3
            className={`md:w-4/10 w-full text-white font-bold xl:text-4xl lg:text-2xl text-[20px] leading-loose`}
          >
            از جدیدترین اخبار و دوره های برنامه ‌نویسی باخبر شوید
          </h3>
          <div
            className={`2xl:w-3/10 lg:w-4/10 md:w-5/10 w-full flex flex-col gap-5`}
          >
            <SearchHeader
              placeHolder={"شماره تماس خود را وارد کنید"}
              buttonClassName={`lg:px-5 lg:py-3 md:px-4 sm:py-2 sm:px-3 px-2 py-1.5 md:text-[14px]! text-[12px]! text-white!`}
              inputClassName={`xl:w-7/10 md:w-6/10 w-7/10`}
              color={"registerBtn"}
              className={`lg:w-80 md:w-70 sm:w-60 w-50`}
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
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              تخصص‌ها
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                HTML & CSS
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                JavaScript
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                React
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                Next.js
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                Node.js
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                REST API
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                Git & GitHub
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              درباره ما
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                اخبار
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                فرصت‌های شغلی
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                تماس با ما
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                مرکز اعتماد
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                قوانین استفاده
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                سیاست امنیت
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                حریم خصوصی
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              حوزه‌های کاربردی
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                فرانت‌اند
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                بک‌اند
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                فول‌استک
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                هوش مصنوعی
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                سئو و بهینه‌سازی
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                طراحی UI/UX
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                موبایل
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              آموزش و پشتیبانی
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                رویدادها
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                پنل کاربری
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                پشتیبانی فنی
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                مقالات آموزشی
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex items-center justify-between px-4`}>
        <h1 className={`text-white lg:text-[18px] text-base font-bold`}>
          آکادمی بحر
        </h1>
        <p
          className={`text-white lg:text-[14px] text-[12px] font-normal hidden md:block`}
        >
          © 2026 تمام حقوق برای آکادمی بحر محفوظ است.
        </p>
        <div className={`flex items-center lg:gap-6 sm:gap-4 gap-2`}>
          <InstagramIcon />
          <FaceBookIcon />
          <TwitterIcon />
          <TelegramIcon />
          <WhatsAppIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
