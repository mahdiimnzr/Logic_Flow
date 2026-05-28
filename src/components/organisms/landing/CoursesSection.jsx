const CoursesSection = () => {
  return (
    <div className={`w-[95%] mx-auto flex flex-col gap-8 items-center`}>
      <div className={`flex flex-col items-center gap-2`}>
        <h3 className={`font-bold text-[32px] text-green-primary`}>
          دوره‌های آموزشی برنامه‌نویسی
        </h3>
        <p className={`text-2xl font-normal text-gray-subtitle`}>
          دوره‌هایی برای همه: یاد بگیر، تمرین کن، پروژه بزن!
        </p>
      </div>
      <div className={`flex flex-col gap-8`}>
        <div></div>
        <div className={`grid grid-cols-4 gap-8 w-full`}></div>
      </div>
    </div>
  );
};

export default CoursesSection;
