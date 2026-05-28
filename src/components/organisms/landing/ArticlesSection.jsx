import ArticlesCardLanding from "@/components/molecules/Cards/ArticlesCardLanding";

const ArticlesSection = () => {
  return (
    <div className="w-[95%] mx-auto flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-bold text-[32px] text-green-primary">
          اخبار و مقالات
        </h3>
        <p className="text-2xl font-normal text-gray-subtitle">
          با تازه‌ترین اخبار و مقالات برنامه‌نویسی به‌روز بمانید
        </p>
      </div>
      <div className="grid grid-cols-[40%_58.25%] gap-8 w-full">
        <ArticlesCardLanding />
        <ArticlesCardLanding />
      </div>
      <div className={`grid grid-cols-3 gap-8 w-full`}>
        <ArticlesCardLanding />
        <ArticlesCardLanding />
        <ArticlesCardLanding />
      </div>
    </div>
  );
};

export default ArticlesSection;
