import { CircleCheck } from "lucide-react";
import roadMap from "../../../assets/images/roadmap.png";

const RoadMapSection = () => {
  return (
    <div className={`w-[95%] mx-auto flex items-center justify-between`}>
      <div>
        <img className={`w-150 h-137.5`} src={roadMap} />
      </div>
      <div className={`w-4/10 flex flex-col gap-8`}>
        <div className={`flex flex-col gap-4`}>
          <h3 className={`text-4xl font-bold text-default-black`}>
            از اولین خط کد تا{" "}
            <span className={`text-green-primary`}>ورود به بازار کار</span> , با
            تو هستیم
          </h3>
          <p className={`text-field-silver text-base font-normal`}>
            ما مسیر یادگیری برنامه‌نویسی را ساده، کاربردی و اثربخش می‌کنیم تا
            سریع‌تر وارد بازار کار شوید.
          </p>
        </div>
        <div className={`flex gap-4`}>
          <CircleCheck color={`#008C78`} className={`size-6.5`} />
          <div className={`flex flex-col gap-3.5`}>
            <h3 className={`text-default-black text-base font-bold`}>
              یادگیری مهارت‌های کاربردی
            </h3>
            <p className={`text-field-silver text-[14px] font-normal`}>
              با تمرکز بر پروژه‌های واقعی و نیاز بازار، مهارت‌هایی یاد می‌گیرید
              که واقعاً به کارتون میان.
            </p>
          </div>
        </div>
        <div className={`flex gap-4`}>
          <CircleCheck color={`#008C78`} className={`size-6.5`} />
          <div className={`flex flex-col gap-3.5`}>
            <h3 className={`text-default-black text-base font-bold`}>
              مسیر یادگیری هدفمند
            </h3>
            <p className={`text-field-silver text-[14px] font-normal`}>
              از مبتدی تا متخصص، آموزش‌ها با برنامه‌ریزی دقیق طراحی شدن تا
              وقتتون هدر نره و قدم‌به‌قدم پیش برید.
            </p>
          </div>
        </div>
        <div className={`flex gap-4`}>
          <CircleCheck color={`#008C78`} className={`size-6.5`} />
          <div className={`flex flex-col gap-3.5`}>
            <h3 className={`text-default-black text-base font-bold`}>
              پشتیبانی و منتورینگ
            </h3>
            <p className={`text-field-silver text-[14px] font-normal`}>
              در طول دوره‌ها تنها نیستید؛ اساتید و منتورها همراه شما هستن تا
              سوالاتتون رو جواب بدن و راهنمایی‌تون کنن.
            </p>
          </div>
        </div>
        <div className={`flex gap-4`}>
          <CircleCheck color={`#008C78`} className={`size-6.5`} />
          <div className={`flex flex-col gap-3.5`}>
            <h3 className={`text-default-black text-base font-bold`}>
              آموزش تکنولوژی‌های به‌روز
            </h3>
            <p className={`text-field-silver text-[14px] font-normal`}>
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
