import ThemeContext from "@/app/context/ThemeContext";
import boyPlaying from "../../../assets/images/landingHero.png";
import ArrowIcon from "../../../core/icons/ArrowIcon";
import Border from "../../atoms/Border/Border";
import Button from "../../atoms/Buttons/Button";
import { useContext } from "react";

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`bg-light-green w-full pt-29 relative -top-29`}>
      <div
        className={`flex flex-col md:flex-row justify-between items-center md:w-[95%] w-[90%] mx-auto py-10`}
      >
        <div className={`md:w-5/10 w-full flex flex-col xl:gap-8 gap-6`}>
          <div className={`flex flex-col xl:gap-6 gap-4`}>
            <h2
              className={`text-default-black xl:text-4xl lg:text-2xl text-[20px] font-bold`}
            >
              یادگیری برنامه‌نویسی با اساتید مجرب ، <br />
              <span className={`text-green-primary leading-normal`}>
                مسیر موفقیت
              </span>
              {""} شما را هموار می‌کند.
            </h2>
            <p
              className={`text-dark-gray xl:text-base lg:text-[14px] text-[12px] font-normal`}
            >
              در دوره‌های تخصصی ما، با اساتید حرفه‌ای و با تجربه یادگیری
              برنامه‌نویسی را آغاز کنید. <br className={`hidden lg:block`} /> از
              مفاهیم پایه تا مهارت‌های پیشرفته، شما را به سطحی می‌رسانیم که
              آماده ورود به <br className={`hidden lg:block`} /> دنیای حرفه‌ای
              فناوری باشید. با روش‌های مدرن و کارآمد، به سرعت رشد کنید!
            </p>
          </div>
          <Button
            color={"primaryBtn"}
            className={`h-11.5 xl:w-63 md:w-55 w-45 flex justify-center items-center gap-1.5`}
          >
            <p className={`xl:text-base md:text-[14px] text-[12px]`}>
              به جمع حرفه‌ای‌ها بپیوندید
            </p>
            <ArrowIcon
              className={`size-3 md:size-3.75`}
              color={theme ? `#1E1E1E` : `#ffffff`}
            />
          </Button>
        </div>
        <div className={`md:w-4/10 w-full flex justify-end`}>
          <img className={`xl:w-125 md:w-100 w-full`} src={boyPlaying} />
        </div>
      </div>
      <div
        className={`bg-green-primary flex flex-col lg:flex-row items-center gap-10 justify-evenly py-10`}
      >
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            اساتید برتر
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +97
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-default-light`}
        />
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>دانشجو</span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +250
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-default-light`}
        />
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            دوره های آموزشی
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +154
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-default-light`}
        />
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            اخبار و مقالات
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +15
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
