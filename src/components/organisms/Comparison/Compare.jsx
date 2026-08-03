import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import { useGetCourseDetail } from "@/core/services/api/Compare/Compare.service";
import formatDate from "@/core/utils/formatDate";
import formatPrice from "@/core/utils/formatPrice";
import LoadingSvg from "@/core/icons/LoadingSvg";
import { useI18n } from "@/i18n/useI18n";
import { ArrowLeft, ChevronLeft, Eye, GraduationCap } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import photoFalBak from "../../../assets/images/coursePng.png";

const Compare = () => {
  const { t, lang } = useI18n();
  const { courseIdOne, courseIdTwo } = useParams();

  const { isLoading: loadingOne, data: DetailOne } =
    useGetCourseDetail(courseIdOne);

  const { isLoading: loadingTwo, data: DetailTwo } =
    useGetCourseDetail(courseIdTwo);

  const compareItems = [
    {
      title: t("compare.teacher"),
      first: DetailOne?.data?.teacherName,
      second: DetailTwo?.data?.teacherName,
    },
    {
      title: t("compare.price"),
      first: `${formatPrice(DetailOne?.data?.cost)} تومان`,
      second: `${formatPrice(DetailTwo?.data?.cost)} تومان`,
    },
    {
      title: t("compare.courseLevel"),
      first: DetailOne?.data?.courseLevelName,
      second: DetailTwo?.data?.courseLevelName,
    },
    {
      title: t("compare.status"),
      first: DetailOne?.data?.statusName,
      second: DetailTwo?.data?.statusName,
    },
    {
      title: t("compare.capacity"),
      first: formatPrice(DetailOne?.data?.capacity),
      second: formatPrice(DetailTwo?.data?.capacity),
    },
    {
      title: t("compare.students"),
      first: DetailOne?.data?.studentCount,
      second: DetailTwo?.data?.studentCount,
    },
    {
      title: t("compare.rating"),
      first: DetailOne?.data?.courseRate,
      second: DetailTwo?.data?.courseRate,
    },
    {
      title: t("compare.likes"),
      first: DetailOne?.data?.likeCount,
      second: DetailTwo?.data?.likeCount,
    },
    {
      title: t("compare.dislikes"),
      first: DetailOne?.data?.dissLikeCount,
      second: DetailTwo?.data?.dissLikeCount,
    },
    {
      title: t("compare.startDate"),
      first: formatDate(DetailOne?.data?.startTime),
      second: formatDate(DetailTwo?.data?.startTime),
    },
    {
      title: t("compare.endDate"),
      first: formatDate(DetailOne?.data?.endTime),
      second: formatDate(DetailTwo?.data?.endTime),
    },
  ];

  return loadingOne || loadingTwo ? (
    <LoadingSvg className="h-full!" />
  ) : (
    <div className="container mx-auto py-10 flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-1">
          <Link to="/" className="text-green-primary text-sm">
            {t("teachers.home")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "rotate-180" : ""}`}
          />
          <span className="text-green-primary">{t("compare.compare")}</span>
        </div>
        <h1 className="xl:text-[28px] sm:text-[23px] text-[18px] font-bold text-default-black">
          {t("compare.compareCourses")}
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative rounded-3xl overflow-hidden border border-green-primary/20 shadow-[0px_4px_4px_0px_#000000]/0 hover:shadow-cards-hover transition-all duration-300 p-5 md:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
          <Link
            to={`/Courses/Detail/${DetailOne?.data?.courseId}`}
            className={`absolute top-4 ${lang === "en" ? "right-4 sm:right-5" : "left-4 sm:left-5"} sm:top-5 size-9 sm:size-10 rounded-full bg-black/25 hover:bg-green-primary transition-all flex items-center justify-center cursor-pointer`}
          >
            <Eye size={18} className="text-white" />
          </Link>

          <ImageFallback
            src={DetailOne?.data?.imageAddress}
            fallback={photoFalBak}
            className="size-24 sm:size-28 md:size-32 shrink-0 rounded-2xl object-cover shadow-[0px_2px_5px_0px_#000000]/15"
          />

          <div
            className={`flex-1 flex flex-col gap-3 text-center ${lang === "en" ? "sm:text-left" : "sm:text-right"}`}
          >
            <span className="font-bold md:text-[15px] text-[12px] text-default-black line-clamp-2">
              {DetailOne?.data?.title}
            </span>

            <div className="flex items-center justify-center sm:justify-start gap-2 text-field-silver">
              <GraduationCap
                size={16}
                className="text-green-primary shrink-0"
              />
              <span className="text-[14px]">
                {DetailOne?.data?.teacherName}
              </span>
            </div>

            <p className="text-field-silver text-[13px] md:text-[14px] leading-7 line-clamp-3 sm:line-clamp-4">
              {DetailOne?.data?.miniDescribe}
            </p>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-green-primary/20 shadow-[0px_4px_4px_0px_#000000]/0 hover:shadow-cards-hover transition-all duration-300 p-5 md:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
          <Link
            to={`/Courses/Detail/${DetailTwo?.data?.courseId}`}
            className={`absolute top-4 ${lang === "en" ? "right-4 sm:right-5" : "left-4 sm:left-5"} sm:top-5 size-9 sm:size-10 rounded-full bg-black/25 hover:bg-green-primary transition-all flex items-center justify-center cursor-pointer`}
          >
            <Eye size={18} className="text-white" />
          </Link>

          <ImageFallback
            src={DetailTwo?.data?.imageAddress}
            fallback={photoFalBak}
            className="size-24 sm:size-28 md:size-32 shrink-0 rounded-2xl object-cover shadow-[0px_2px_5px_0px_#000000]/15"
          />

          <div
            className={`flex-1 flex flex-col gap-3 text-center ${lang === "en" ? "sm:text-left" : "sm:text-right"}`}
          >
            <span className="font-bold md:text-[14px] text-[12px] text-default-black line-clamp-2">
              {DetailTwo?.data?.title}
            </span>

            <div className="flex items-center justify-center sm:justify-start gap-2 text-field-silver">
              <GraduationCap
                size={16}
                className="text-green-primary shrink-0"
              />
              <span>{DetailTwo?.data?.teacherName}</span>
            </div>

            <p className="text-field-silver text-[13px] md:text-[14px] leading-7 line-clamp-3 sm:line-clamp-4">
              {DetailTwo?.data?.miniDescribe}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-green-primary/20 shadow-md">
        <div className="grid grid-cols-3 bg-green-primary text-default-light font-bold">
          <div className="p-5">{t("compare.feature")}</div>
          <div className="p-5 text-center truncate">
            {DetailOne?.data?.title}
          </div>
          <div className="p-5 text-center truncate">
            {DetailTwo?.data?.title}
          </div>
        </div>
        {compareItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 border-b  border-light-gray hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer"
          >
            <div className="p-4 font-medium text-default-black transition-all duration-300">
              {item.title}
            </div>
            <div className="p-4 text-center text-default-black transition-all duration-300">
              {item.first ?? "-"}
            </div>
            <div className="p-4 text-center text-default-black transition-all duration-300">
              {item.second ?? "-"}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-green-primary/20 bg-default-light p-6 shadow-sm">
          <h3 className="text-xl font-bold text-default-black mb-6">
            {t("compare.courseTechnologies")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {(DetailOne?.data?.courseTech ?? []).length > 0 ? (
              (DetailOne?.data?.courseTech ?? [])?.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-green-primary/10 text-green-primary text-sm font-medium  transition-all"
                >
                  {item.tech.techName}
                </span>
              ))
            ) : (
              <span
                className={`text-[14px] font-semibold text-default-black text-center`}
              >
                {t("userPanel.dashboardSection.notFound")}
              </span>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-green-primary/20 bg-default-light p-6 shadow-sm">
          <h3 className="text-xl font-bold text-default-black mb-6">
            {t("compare.courseTechnologies")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {(DetailTwo?.data?.courseTech ?? []).length > 0 ? (
              (DetailTwo?.data?.courseTech ?? [])?.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-green-primary/10 text-green-primary text-sm font-medium  transition-all"
                >
                  {item.tech.techName}
                </span>
              ))
            ) : (
              <span
                className={`text-[14px] font-semibold text-default-black text-center`}
              >
                {t("userPanel.dashboardSection.notFound")}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <Link
          dir="rtl"
          to={"/Courses"}
          className="flex items-center gap-2 rounded-xl bg-green-primary hover:bg-green-primary/90 text-default-light px-7 py-3"
        >
          <span>{t("compare.backToCourses")}</span>
          <ArrowLeft size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Compare;
