import ArticlesCardLanding from "@/components/molecules/Cards/ArticlesCardLanding";
import useGetArticles from "@/core/services/api/common/useGetArticles";
import { useMemo } from "react";

const ArticlesSection = () => {
  const { isLoading, data } = useGetArticles({
    RowsOfPage: "100",
    TechCount: "1",
  });
  const articlesRow1 = useMemo(() => {
    return data?.news?.slice(0, 2);
  }, [data]);
  const articlesRow2 = useMemo(() => {
    return data?.news?.slice(2, 5);
  }, [data]);
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
        {articlesRow1?.map((article, index) => {
          return (
            <ArticlesCardLanding
              key={index}
              articleId={article.id}
              title={article.title}
              describe={article.describe}
              rate={article.newsRate.avg}
              categoryName={article.newsCatregoryName}
              currentView={article.currentView}
              image={article.currentImageAddress}
            />
          );
        })}
      </div>
      <div className={`grid grid-cols-3 gap-8 w-full`}>
        {articlesRow2?.map((article, index) => {
          return (
            <ArticlesCardLanding
              key={index}
              articleId={article.id}
              title={article.title}
              describe={article.describe}
              rate={article.newsRate.avg}
              categoryName={article.newsCatregoryName}
              currentView={article.currentView}
              image={article.currentImageAddress}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ArticlesSection;
