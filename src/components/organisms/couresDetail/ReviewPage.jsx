import Person from "@/core/icons/Person";
import Time from "@/core/icons/Time";

const ReviewPage = () => {
  return (
    <>
      <div className={`flex flex-col gap-9 `}>
        <span className={`size-4.5 font-bold text-default-black`}>جزئیات</span>
        <div className={`flex gap-[47px]`}>
          <div
            className={`xl:w-[186px] xl:h-[81px] rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
          >
            <span className={`text-[12px] text-field-silver`}>
              تعداد دانشجو
            </span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Person />
              <span className={`text-default-black`}>38 نفر</span>
            </div>
          </div>
          <div
            className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
          >
            <span className={`text-[12px] text-field-silver`}>مدت زمان</span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Time className={`w-4 h-4`} />
              <span className={`text-default-black`}>38 نفر</span>
            </div>
          </div>
          <div
            className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
          >
            <span className={`text-[12px] text-field-silver`}>سطح دوره</span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Person />
              <span className={`text-default-black`}>38 نفر</span>
            </div>
          </div>
          <div
            className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
          >
            <span className={`text-[12px] text-field-silver`}>وضعیت دوره</span>
            <div className={`flex gap-2 justify-center items-center`}>
              <Person />
              <span className={`text-default-black`}>38 نفر</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`border xl:w-[887px] xl:h-[248px]  mt-10`}>
        <span className={`text-[18px] text-default-black font-bold`}>
          توضیحات
        </span>
        <p className={`text-field-silver leading-loose`}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </p>
      </div>
    </>
  );
};

export default ReviewPage;
