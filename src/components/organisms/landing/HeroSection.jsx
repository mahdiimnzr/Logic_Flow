import boyPlaying from "../../../assets/images/landingHero.png";
import ArrowIcon from "../../../core/icons/ArrowIcon";
import Border from "../../atoms/Border/Border";
import Button from "../../atoms/Buttons/Button";
import { CountUp } from "use-count-up";

const HeroSection = () => {
  return (
    <div className={`bg-light-green w-full pt-10 relative`}>
      <div
        className={`flex flex-col md:flex-row justify-between items-center md:w-[95%] w-[90%] mx-auto py-10`}
      >
        <div className={`md:w-5/10 w-full flex flex-col xl:gap-8 gap-6`}>
          <div className={`flex flex-col xl:gap-6 gap-4`}>
            <h2
              className={`text-default-black 3xl:text-[40px]! xl:text-4xl lg:text-2xl md:text-[20px] text-[18px] font-bold`}
            >
              یادگیری برنامه‌نویسی با اساتید مجرب ، <br />
              <span className={`text-green-primary leading-normal`}>
                مسیر موفقیت
              </span>
              {""} شما را هموار می‌کند.
            </h2>
            <p
              className={`text-dark-gray 3xl:text-[20px]! xl:text-base lg:text-[14px] text-[12px] font-normal`}
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
            className={`h-11.5 xl:w-63 md:w-55 w-45 flex justify-center items-center xl:gap-3 gap-1.5`}
          >
            <p className={`xl:text-base md:text-[14px] text-[12px]`}>
              به جمع حرفه‌ای‌ها بپیوندید
            </p>
            <ArrowIcon className={`size-3 md:size-3.75`} />
          </Button>
        </div>
        <div className={`md:w-4/10 w-full flex justify-end`}>
          <img
            className={`3xl:w-150! xl:w-125 md:w-100 w-full`}
            src={boyPlaying}
          />
        </div>
      </div>
      <div
        className={`bg-green-primary flex flex-col lg:flex-row items-center gap-10 justify-evenly 3xl:py-15 py-10`}
      >
        <div className={`text-white flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            اساتید برتر
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +<CountUp isCounting start={0} end={97} duration={1.5} />
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-white`}
        />
        <div className={`text-white flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>دانشجو</span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +<CountUp isCounting start={0} end={250} duration={1.5} />
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-white`}
        />
        <div className={`text-white flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            دوره های آموزشی
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +<CountUp isCounting start={0} end={154} duration={1.5} />
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-white`}
        />
        <div className={`text-white flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            اخبار و مقالات
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +<CountUp isCounting start={0} end={15} duration={1.5} />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
