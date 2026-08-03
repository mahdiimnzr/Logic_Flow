import { useI18n } from "@/i18n/useI18n";
import boyPlaying from "../../../assets/images/landingHero.png";
import ArrowIcon from "../../../core/icons/ArrowIcon";
import Border from "../../atoms/Border/Border";
import Button from "../../atoms/Buttons/Button";
import { CountUp } from "use-count-up";
import { useGetLandingReport } from "@/core/services/api/landing/landing.service";
import useGetCourses from "@/core/services/api/hooks/useGetCourse";
import useGetArticles from "@/core/services/api/hooks/useGetArticles";
import { useContext, useEffect, useMemo, useState } from "react";
import debounce from "debounce";
import SearchHeader from "@/components/molecules/Inputs/SearchHeader";
import ThemeContext from "@/app/context/ThemeContext";
import { Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import image from "../../../assets/images/coursePng.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";

const HeroSection = () => {
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);

  const skeletonCount = new Array(3).fill("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("courses");
  const [searchHeaderValue, setSearchHeaderValue] = useState("");
  const [params, setParams] = useState({
    RowsOfPage: 3,
    Query: null,
  });

  const updateParams = (key, value) => {
    const newParams = { ...params, [key]: value };
    return setParams(newParams);
  };

  const { isLoading, data: landingReport } = useGetLandingReport();
  const {
    isLoading: coursesLoading,
    data: courses,
    refetch: coursesRefetch,
  } = useGetCourses("FundedCourses", params);
  const {
    isLoading: newsLoading,
    data: articles,
    refetch: articlesRefetch,
  } = useGetArticles("FundedArticles", params);

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        updateParams("Query", value.trim() === "" ? null : value.trim());
        if (
          (searchValue === "courses" ? courses : articles) &&
          value.trim() !== ""
        ) {
          setModalOpen(true);
        } else if (
          (searchValue === "courses" ? !courses : !articles) ||
          (searchValue === "courses" ? courses : articles)?.length === 0 ||
          value.trim() === ""
        ) {
          setModalOpen(false);
        }
      }, 1000),
    [searchValue, courses, articles],
  );
  useEffect(() => {
    searchValue === "courses" ? coursesRefetch() : articlesRefetch();
  }, [params, searchValue]);
  return (
    <div className={`bg-light-green w-full pt-12 relative`}>
      <div
        className={`flex flex-col md:flex-row justify-between items-center md:w-[95%] w-[90%] mx-auto py-10`}
      >
        <SearchHeader
          buttonClassName={`size-10`}
          placeHolder={t("header.inputPlaceHolder")}
          haveSelect={true}
          className={`flex md:hidden relative w-full h-11`}
          contentClassName={`${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
          itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`}`}
          onChange={(event) => {
            handleSearch(event.target.value);
            setSearchHeaderValue(event.target.value);
          }}
          value={searchValue}
          setValue={setSearchValue}
          onValueChange={setSearchValue}
          searchValue={searchHeaderValue}
        >
          <Search
            className={`mx-auto size-5`}
            color={theme ? `#000000` : `#ffffff`}
          />
          {modalOpen && (
            <div
              className={`absolute top-12 right-0 left-0 bg-default-light rounded-[6px] border border-light-gray`}
            >
              <div className={`flex flex-col gap-3 p-2`}>
                <div
                  onClick={() => setModalOpen(false)}
                  className={`flex items-center gap-2`}
                >
                  <X
                    className={`size-5`}
                    color={theme ? `#ffffff` : `#1E1E1E`}
                  />
                  <span className={`text-default-black text-[14px]`}>
                    {t("header.closeBtn")}
                  </span>
                </div>
                <Border
                  width="w-full"
                  height="h-0.5"
                  background={`bg-field-gray`}
                />
                <div className={`flex flex-col gap-1`}>
                  {coursesLoading || newsLoading ? (
                    skeletonCount?.map((value, index) => (
                      <Skeleton key={index} className={`w-9/10 h-11.5`} />
                    ))
                  ) : (searchValue === "courses"
                      ? courses.data?.courseFilterDtos
                      : articles?.data?.news
                    )?.length === 0 ? (
                    <span className={`text-default-black text-[14px]`}>
                      {t("header.notFound")}
                    </span>
                  ) : (
                    (searchValue === "courses"
                      ? courses?.data?.courseFilterDtos
                      : articles?.data?.news
                    )?.map((value, index) => (
                      <Link
                        key={index}
                        to={
                          searchValue === "courses"
                            ? `/Courses/Detail/${value?.courseId}/Review`
                            : `/Articles/Detail/${value?.id}/Review`
                        }
                        onClick={() => {
                          setModalOpen(false);
                          setSearchHeaderValue("");
                        }}
                        className={`flex items-center gap-2 rounded-[5px] px-2 py-1 hover:bg-black/10 dark:hover:bg-black/50`}
                      >
                        <ImageFallback
                          className={`w-15 h-11 rounded-[10px]`}
                          src={value.imageAddress}
                          fallback={image}
                        />
                        <span
                          className={`text-default-black text-[14px] w-full text-right truncate`}
                        >
                          {value?.title}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
                {(searchValue === "courses"
                  ? courses.data?.courseFilterDtos
                  : articles?.data?.news
                )?.length >= 3 && (
                  <Link
                    to={searchValue === "courses" ? `/Courses` : `/Articles`}
                    className={`text-[14px]! h-10 flex items-center justify-center gap-1 bg-green-primary text-white font-bold rounded-[100px] cursor-pointer`}
                    onClick={() => {
                      setModalOpen(false);
                      setSearchHeaderValue("");
                    }}
                  >
                    <span>
                      {" "}
                      {searchValue === "courses"
                        ? t("header.seeAllCourses")
                        : t("header.seeAllArticles")}
                    </span>
                    <ArrowIcon className={`size-3`} color={`#ffffff`} />
                  </Link>
                )}
              </div>
            </div>
          )}
        </SearchHeader>
        <div className={`md:w-5/10 w-full flex flex-col xl:gap-8 gap-6 mt-5`}>
          <div className={`flex flex-col xl:gap-6 gap-4`}>
            <h2
              className={`text-default-black 3xl:text-[40px]! xl:text-4xl lg:text-2xl md:text-[20px] text-[18px] font-bold`}
            >
              {t("landing.heroSection.title")} <br />
              <span className={`text-green-primary leading-normal`}>
                {[t("landing.heroSection.titleKeyWord")]}
              </span>
              {""} {t("landing.heroSection.titleLastLine")}
            </h2>
            <p
              className={`text-dark-gray 3xl:text-[20px]! xl:text-base lg:text-[14px] text-[12px] font-normal`}
            >
              {t("landing.heroSection.descriptionFirstLine")}{" "}
              <br className={`hidden lg:block`} />{" "}
              {t("landing.heroSection.descriptionSecondLine")}{" "}
              <br className={`hidden lg:block`} />{" "}
              {t("landing.heroSection.descriptionThirdLine")}
            </p>
          </div>
          <Button
            color={"primaryBtn"}
            className={`h-11.5 xl:w-63 md:w-55 w-45 flex justify-center items-center xl:gap-3 gap-1.5`}
          >
            <p className={`xl:text-base md:text-[14px] text-[12px]`}>
              {t("landing.heroSection.linkBtn")}
            </p>
            <ArrowIcon
              className={`size-3 md:size-3.75 ${lang === "en" ? "transform-[rotate(90deg)]" : "transform-[rotate(0deg)]"}`}
            />
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
            {t("landing.heroSection.bestTeachers")}
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +
            <CountUp
              isCounting
              start={0}
              end={landingReport?.data?.teacherCount}
              duration={1.5}
            />
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-white`}
        />
        <div className={`text-white flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            {" "}
            {t("landing.heroSection.students")}
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +
            <CountUp
              isCounting
              start={0}
              end={landingReport?.data?.studentCount}
              duration={1.5}
            />
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-white`}
        />
        <div className={`text-white flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            {t("landing.heroSection.courses")}
          </span>
          <h3 dir="ltr" className={`xl:text-5xl text-4xl font-bold`}>
            +
            <CountUp
              isCounting
              start={0}
              end={landingReport?.data?.courseCount}
              duration={1.5}
            />
          </h3>
        </div>
        <Border
          width={`lg:w-0.5 md:w-4/10 sm:w-5/10 w-6/10`}
          height={`lg:h-15 h-0.5`}
          color={`bg-white`}
        />
        <div className={`text-white flex items-center gap-4`}>
          <span className={`font-normal xl:text-2xl text-[20px]`}>
            {t("landing.heroSection.articles")}
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
