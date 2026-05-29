import { CircleCheck } from "lucide-react";
import roadMap from "../../../assets/images/roadmap.png";

const RoadMapSection = () => {
  return (
    <div className={`w-[95%] mx-auto flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between`}>
      <div>
        <img
          className={`2xl:w-150 2xl:h-137.5 xl:w-120 xl:h-117.5 md:w-100 md:h-87.5 w-full h-auto`}
          src={roadMap}
        />
      </div>
      <div className={`2xl:w-4/10 md:w-6/10 w-full flex flex-col xl:gap-8 gap-5`}>
        <div className={`flex flex-col gap-4`}>
          <h3 className={`xl:text-4xl text-2xl font-bold text-default-black`}>
            از اولین خط کد تا{" "}
            <span className={`text-green-primary`}>ورود به بازار کار</span> , با
            تو هستیم
          </h3>
          <p
            className={`text-field-silver xl:text-base text-[14px] font-normal`}
          >
            ما مسیر یادگیری برنامه‌نویسی را ساده، کاربردی و اثربخش می‌کنیم تا
            سریع‌تر وارد بازار کار شوید.
          </p>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3 className={`text-default-black xl:text-base text-[14px] font-bold`}>
              یادگیری مهارت‌های کاربردی
            </h3>
            <p className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}>
              با تمرکز بر پروژه‌های واقعی و نیاز بازار، مهارت‌هایی یاد می‌گیرید
              که واقعاً به کارتون میان.
            </p>
          </div>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3 className={`text-default-black xl:text-base text-[14px] font-bold`}>
              مسیر یادگیری هدفمند
            </h3>
            <p className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}>
              از مبتدی تا متخصص، آموزش‌ها با برنامه‌ریزی دقیق طراحی شدن تا
              وقتتون هدر نره و قدم‌به‌قدم پیش برید.
            </p>
          </div>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3 className={`text-default-black xl:text-base text-[14px] font-bold`}>
              پشتیبانی و منتورینگ
            </h3>
            <p className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}>
              در طول دوره‌ها تنها نیستید؛ اساتید و منتورها همراه شما هستن تا
              سوالاتتون رو جواب بدن و راهنمایی‌تون کنن.
            </p>
          </div>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3 className={`text-default-black xl:text-base text-[14px] font-bold`}>
              آموزش تکنولوژی‌های به‌روز
            </h3>
            <p className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}>
              از HTML و CSS تا React، Node.js، پایتون، و هوش مصنوعی — همیشه
              به‌روز یاد می‌گیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMapSection;
