import ArticlesCardLanding from "@/components/molecules/Cards/ArticlesCardLanding";
import { Skeleton } from "@/components/ui/skeleton";
import useAddFavoriteArticle from "@/core/services/api/hooks/useAddFavoriteArticle";
import useGetArticles from "@/core/services/api/hooks/useGetArticles";
import { useI18n } from "@/i18n/useI18n";
import { useMemo } from "react";

const ArticlesSection = () => {
  const { t } = useI18n();
  const skeletonCount1 = new Array(2).fill("");
  const skeletonCount2 = new Array(3).fill("");
  const { isLoading, data: articles } = useGetArticles("ArticlesLanding", {
    RowsOfPage: "100",
    TechCount: "1",
  });
  const articlesRow1 = useMemo(() => {
    return articles?.data?.news?.slice(0, 2);
  }, [articles]);
  const articlesRow2 = useMemo(() => {
    return articles?.data?.news?.slice(2, 5);
  }, [articles]);
  return (
    <div className="md:w-[95%] w-[90%] mx-auto flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center text-center gap-2">
        <h3 className="font-bold xl:text-[32px] md:text-[28px] text-[20px] text-green-primary">
          {t("landing.articlesSection.title")}
        </h3>
        <p className="xl:text-2xl md:text-[20px] text-base font-normal text-gray-subtitle">
          {t("landing.articlesSection.description")}
        </p>
      </div>
      <div className="grid 2xl:grid-cols-[40%_58.25%] xl:grid-cols-[40%_57.5%] lg:grid-cols-[40%_56.5%] gap-8 w-full">
        {isLoading
          ? skeletonCount1?.map((value, index) => (
              <div
                key={index}
                className={`w-full p-5 flex flex-col gap-5 rounded-[20px] bg-field-silver`}
              >
                <Skeleton className={`h-7 w-1/10 mt-40`} />
                <Skeleton className={`h-7 w-5/10`} />
                <Skeleton className={`h-18 w-full`} />
                <Skeleton className={`h-7 w-full`} />
              </div>
            ))
          : articlesRow1?.map((article, index) => (
              <ArticlesCardLanding
                key={index}
                articleId={article.id}
                title={article.title}
                describe={article.describe}
                rate={article.newsRate.avg}
                categoryName={article.newsCatregoryName}
                currentView={article.currentView}
                image={article.currentImageAddress}
                handleAddFavoriteArticle={useAddFavoriteArticle}
              />
            ))}
      </div>
      <div className={`grid lg:grid-cols-3 gap-8 w-full`}>
        {isLoading
          ? skeletonCount2?.map((_, index) => (
              <div
                key={index}
                className={`w-full p-5 flex flex-col gap-5 rounded-[20px] bg-field-silver`}
              >
                <Skeleton className={`h-7 w-1/10 mt-40`} />
                <Skeleton className={`h-7 w-5/10`} />
                <Skeleton className={`h-18 w-full`} />
                <Skeleton className={`h-7 w-full`} />
              </div>
            ))
          : articlesRow2?.map((article, index) => (
              <ArticlesCardLanding
                key={index}
                articleId={article.id}
                title={article.title}
                describe={article.describe}
                rate={article.newsRate.avg}
                categoryName={article.newsCatregoryName}
                currentView={article.currentView}
                image={article.currentImageAddress}
                handleAddFavoriteArticle={useAddFavoriteArticle}
              />
            ))}
      </div>
    </div>
  );
};

export default ArticlesSection;
