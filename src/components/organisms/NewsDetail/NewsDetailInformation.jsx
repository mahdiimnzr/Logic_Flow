import Badge from "@/components/atoms/Badge/Badge";
import imgCourseDetail from "../../../assets/images/coursePng.png";
import Button from "@/components/atoms/Buttons/Button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import teacherDetail1 from "../../../assets/images/teacherDetail.png";
import newsDetail from "../../../assets/images/newsDetail.png";
import { useEffect, useRef, useState } from "react";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useI18n } from "@/i18n/useI18n";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Skeleton } from "@/components/ui/skeleton";
import Card from "@/components/molecules/Cards/Card";
import FavoriteIcon from "@/core/icons/FavoriteIcon";
import {
  deleteNewsLike,
  postNewsDisLike,
  postNewsLike,
  postNewsRating,
  useGetNewsDetails,
} from "@/core/services/api/newsDetails/newsDetails.service";
import useAddFavoriteArticle from "@/core/services/api/hooks/useAddFavoriteArticle";
import useGetArticles from "@/core/services/api/hooks/useGetArticles";
import formatDate from "@/core/utils/formatDate";
import EyeOpenIcon from "@/core/icons/EyeOpenIcon";

const menu = [
  { path: "Review", Text: " جزئیات خبر", textEn: "News Detail" },
  { path: "Comments", Text: "نظرات کاربران", textEn: "Peoples Comments" },
];

const NewsDetailInformation = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { t, lang } = useI18n();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const skeletonCount = new Array(4).fill("");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { isLoading: slidersLoading, data: articles } = useGetArticles(
    "RecommendedNews",
    {
      RowsOfPage: "100",
    },
  );
  const { isLoading, data: details, refetch } = useGetNewsDetails(id);
  const { addFavoriteNewsMutate, removeFavoriteNewsMutate } =
    useAddFavoriteArticle();

  const { mutate: likeMutate } = useMutation({
    mutationFn: postNewsLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`newsDetails${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: deleteNewsLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`newsDetails${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const { mutate: disLikeMutate } = useMutation({
    mutationFn: postNewsDisLike,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`newsDetails${id}`] });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const { mutate: addRateForNews } = useMutation({
    mutationFn: postNewsRating,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`newsDetails${id}`] });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const handleLike = () => {
    if (details?.data?.detailsNewsDto?.currentUserIsLike) {
      deleteLikeMutate({
        deleteEntityId: details?.data?.detailsNewsDto?.likeId,
      });
    } else if (!details?.data?.detailsNewsDto?.currentUserIsLike) {
      likeMutate(id);
    }
  };
  const handleDisLike = () => {
    disLikeMutate(id);
  };
  const handleFavorite = () => {
    if (details?.data?.detailsNewsDto.currentUserFavoriteId) {
      removeFavoriteNewsMutate({
        deleteEntityId: details?.data?.detailsNewsDto?.currentUserFavoriteId,
        key: `newsDetails${id}`,
      });
    } else if (!details?.data?.detailsNewsDto.currentUserFavoriteId) {
      addFavoriteNewsMutate({ id, key: `newsDetails${id}` });
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className={`flex flex-col gap-10 items-center`}>
      <div className={`flex flex-col gap-4 items-center`}>
        <div className={`flex sm:flex-row flex-col items-center gap-1`}>
          <Link
            className={`text-[14px] font-normal text-green-primary`}
            to={"/"}
          >
            {t("newsDetail.home")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "sm:transform-[rotate(180deg)] transform-[rotate(270deg)]" : "sm:transform-[rotate(0deg)] transform-[rotate(270deg)]"}`}
            color="#008C78"
          />
          <Link
            className={`text-[14px] font-normal text-green-primary`}
            to={"/Articles"}
          >
            {t("newsDetail.articles")}
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "sm:transform-[rotate(180deg)] transform-[rotate(270deg)]" : "sm:transform-[rotate(0deg)] transform-[rotate(270deg)]"}`}
            color="#008C78"
          />
          {isLoading ? (
            <div className={`p-1 rounded-[5px] bg-field-silver`}>
              <Skeleton className={`w-50 h-4 rounded-[5px]`} />
            </div>
          ) : (
            <Link className={`text-[14px] font-normal text-green-primary`}>
              {details?.data?.detailsNewsDto?.title}
            </Link>
          )}
        </div>
        {isLoading ? (
          <div className={`p-1 rounded-[5px] bg-field-silver`}>
            <Skeleton className={`w-100 h-10 rounded-[5px]`} />
          </div>
        ) : (
          <span className={`text-default-black md:text-[32px] font-bold`}>
            {details?.data?.detailsNewsDto?.title}
          </span>
        )}
      </div>
      <div className={`w-full flex flex-col lg:flex-row gap-12`}>
        <div className={`xl:w-3/10 lg:w-4/10 w-full flex flex-col gap-12`}>
          <div className={`flex flex-col gap-4 lg:hidden`}>
            {isLoading ? (
              <div className={`p-1 rounded-[5px] bg-field-silver`}>
                <Skeleton
                  className={`w-full md:h-110 sm:h-90 h-50 rounded-[5px]`}
                />
              </div>
            ) : (
              <div className={`relative`}>
                <div
                  onClick={() => handleFavorite(id)}
                  className={`content-center bg-default-black/25 size-10 rounded-full cursor-pointer absolute right-4 top-4`}
                >
                  <FavoriteIcon
                    className={`mx-auto`}
                    isFavorite={
                      details?.data?.detailsNewsDto?.currentUserFavoriteId
                    }
                  />
                </div>
                <ImageFallback
                  src={details?.data?.detailsNewsDto?.currentImageAddress}
                  fallback={imgCourseDetail}
                  className={`w-full md:h-110 sm:h-90 sm:rounded-[25px] rounded-[20px]`}
                />
              </div>
            )}
            <div
              className={`flex sm:flex-row flex-col sm:items-center gap-5 sm:gap-0 justify-between`}
            >
              <div
                className={`flex sm:justify-center justify-start items-center lg:gap-4 gap-2`}
              >
                <Badge
                  color={"technologyBadge"}
                  className={`px-2 xl:py-0.5 py-1`}
                >
                  {details?.data?.detailsNewsDto?.newsCatregoryName}
                </Badge>
                <span className={`text-base font-normal text-field-silver`}>
                  {formatDate(details?.data?.detailsNewsDto?.insertDate)}
                </span>
                <div className={`flex items-center gap-1`}>
                  <EyeOpenIcon />
                  <span className={`text-base font-normal text-field-silver`}>
                    {details?.data?.detailsNewsDto?.currentView}
                  </span>
                </div>
              </div>
              <div className={`flex gap-2 text-center`}>
                <Button
                  onClick={handleDisLike}
                  color={"likeAndDisLikeBtn"}
                  className={`xl:w-21 w-18 xl:h-11 h-10 flex items-center justify-center gap-2 cursor-pointer`}
                  isLikeOrDislike={
                    details?.data?.detailsNewsDto?.currentUserIsDissLike
                      ? true
                      : false
                  }
                >
                  {details?.data?.detailsNewsDto?.currentDissLikeCount}
                  <ThumbsDown className={`xl:size-6 size-5`} />
                </Button>
                <Button
                  onClick={handleLike}
                  color={"likeAndDisLikeBtn"}
                  className={`xl:w-21 w-18 xl:h-11 h-10 flex items-center justify-center gap-2 cursor-pointer`}
                  isLikeOrDislike={
                    details?.data?.detailsNewsDto?.currentUserIsLike
                      ? true
                      : false
                  }
                >
                  {details?.data?.detailsNewsDto?.currentLikeCount}
                  <ThumbsUp className={`xl:size-6 size-5`} />
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`bg-default-light flex flex-col xl:gap-12 gap-6 p-4 items-center justify-center rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <div className={`flex flex-col gap-2`}>
              <ImageFallback
                src={details?.data?.detailsNewsDto?.addUserProfileImage}
                fallback={teacherDetail1}
                className={`2xl:size-68 size-42 rounded-full`}
              />
              <div className={`text-center`}>
                <p
                  className={`text-field-silver xl:text-base text-[14px] font-normal`}
                >
                  {t("newsDetail.writer")}
                </p>
                <p
                  className={`xl:text-[18px] text-base font-bold text-default-black`}
                >
                  {details?.data?.detailsNewsDto?.addUserFullName}
                </p>
              </div>
            </div>
            <Link
              to={`/Teachers/Detail/${details?.data?.detailsNewsDto?.userId}`}
              className={`w-full`}
            >
              <Button
                color={`teachersBtn`}
                className={`h-11.5! w-full! xl:rounded-[20px]! rounded-[15px]! xl:text-base! text-[14px]!`}
              >
                {t("newsDetail.showMoreInfo")}
              </Button>
            </Link>
          </div>
          <div
            className={`bg-default-light flex flex-col gap-5 p-4 rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <span
              className={`xl:text-[18px] lg:text-base text-default-black font-bold`}
            >
              {t("newsDetail.peopleRate")}
            </span>
            <div className={`flex items-center justify-between`}>
              <div>
                <Rating
                  initialValue={details?.data?.detailsNewsDto?.newsRate?.avg}
                  SVGstyle={{ display: "inline-block" }}
                  allowFraction={true}
                  transition={true}
                  SVGclassName={`xl:size-9 size-7`}
                  onClick={(event) => {
                    addRateForNews({ newsId: id, rateNumber: event });
                  }}
                />
              </div>
              <span
                className={`text-field-silver xl:text-base text-[14px] font-normal`}
              >
                {details?.data?.detailsNewsDto?.newsRate?.avg % 1 === 0
                  ? details?.data?.detailsNewsDto?.newsRate?.avg
                  : details?.data?.detailsNewsDto?.newsRate?.avg.toFixed(1)}
                {""} {t("newsDetail.rate")}
              </span>
            </div>
          </div>
          <div
            className={`bg-default-light hidden lg:flex flex-col xl:gap-4 gap-2 p-4 rounded-[20px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <span className={` text-[18px] text-default-black font-bold`}>
              {t("newsDetail.newestArticles")}
            </span>
            <div className={`flex flex-col gap-4`}>
              {slidersLoading ? (
                <div className={`p-1 rounded-[5px] bg-field-silver`}>
                  <Skeleton className={`w-full h-24 rounded-[5px]`} />
                </div>
              ) : (
                articles?.data?.news?.slice(0, 6)?.map((value, index) => (
                  <Link
                    to={`/Articles/Detail/${value.id}/Review`}
                    key={index}
                    className={`border-2 border-light-gray flex justify-between p-2 items-center gap-2 rounded-[20px]`}
                  >
                    <ImageFallback
                      src={details?.data?.detailsNewsDto?.currentImageAddress}
                      fallback={newsDetail}
                      className={`2xl:w-25 h-24 rounded-[12px]`}
                    />
                    <div className={`flex flex-col gap-2 w-full`}>
                      <span
                        className={`h-12.5 line-clamp-2 text-[14px] text-default-black font-bold`}
                      >
                        {value.title}
                      </span>
                      <div className={`flex justify-between`}>
                        <span
                          className={`text-[12px] font-normal text-field-silver`}
                        >
                          {value.addUserFullName}
                        </span>
                        <span
                          className={`text-[12px] font-normal text-field-silver`}
                        >
                          {formatDate(value.insertDate)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
        <div className={`xl:w-7/10 lg:w-6/10 w-full flex flex-col gap-10`}>
          <div className={`lg:flex flex-col gap-4 hidden`}>
            {isLoading ? (
              <div className={`p-1 rounded-[5px] bg-field-silver`}>
                <Skeleton className={`w-full md:h-110 sm:h-90 rounded-[5px]`} />
              </div>
            ) : (
              <div className={`relative`}>
                <div
                  onClick={() => handleFavorite(id)}
                  className={`content-center bg-default-black/25 size-10 rounded-full cursor-pointer absolute right-4 top-4`}
                >
                  <FavoriteIcon
                    className={`mx-auto`}
                    isFavorite={
                      details?.data?.detailsNewsDto?.currentUserFavoriteId
                    }
                  />
                </div>
                <ImageFallback
                  src={details?.data?.detailsNewsDto?.currentImageAddress}
                  fallback={imgCourseDetail}
                  className={`w-full xl:h-140 lg:h-87 sm:rounded-[25px] rounded-[20px]`}
                />
              </div>
            )}
            <div
              className={`flex sm:flex-row flex-col sm:items-center gap-5 sm:gap-0 justify-between`}
            >
              {isLoading ? (
                <div className={`p-1 rounded-[5px] bg-field-silver`}>
                  <Skeleton className={`w-50 h-7 rounded-[5px]`} />
                </div>
              ) : (
                <div
                  className={`flex sm:justify-center justify-start items-center lg:gap-4 gap-2`}
                >
                  <Badge
                    color={"technologyBadge"}
                    className={`px-2 xl:py-0.5 py-1`}
                  >
                    {details?.data?.detailsNewsDto?.newsCatregoryName}
                  </Badge>
                  <span className={`text-base font-normal text-field-silver`}>
                    {formatDate(details?.data?.detailsNewsDto?.insertDate)}
                  </span>
                  <div className={`flex items-center gap-1`}>
                    <EyeOpenIcon />
                    <span className={`text-base font-normal text-field-silver`}>
                      {details?.data?.detailsNewsDto?.currentView}
                    </span>
                  </div>
                </div>
              )}
              <div className={`flex gap-2 text-center`}>
                <Button
                  onClick={handleDisLike}
                  color={"likeAndDisLikeBtn"}
                  className={`xl:w-21 w-18 xl:h-11 h-10 flex items-center justify-center gap-2 cursor-pointer`}
                  isLikeOrDislike={
                    details?.data?.detailsNewsDto?.currentUserIsDissLike
                      ? true
                      : false
                  }
                >
                  {details?.data?.detailsNewsDto?.currentDissLikeCount}
                  <ThumbsDown className={`xl:size-6 size-5`} />
                </Button>
                <Button
                  onClick={handleLike}
                  color={"likeAndDisLikeBtn"}
                  className={`xl:w-21 w-18 xl:h-11 h-10 flex items-center justify-center gap-2 cursor-pointer`}
                  isLikeOrDislike={
                    details?.data?.detailsNewsDto?.currentUserIsLike
                      ? true
                      : false
                  }
                >
                  {details?.data?.detailsNewsDto?.currentLikeCount}
                  <ThumbsUp className={`xl:size-6 size-5`} />
                </Button>
              </div>
            </div>
          </div>
          <div className={`flex gap-4 items-center`}>
            {menu?.map((value, index) => (
              <NavLink
                key={index}
                to={value.path}
                className={({ isActive }) =>
                  `${isActive ? `text-default-light xl:text-base text-[14px] bg-green-primary xl:px-4 xl:py-3 px-3 py-2 rounded-[50px]` : `text-default-black`} text-center`
                }
              >
                {lang === "en" ? value.textEn : value.Text}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full py-12">
        <div className="flex items-center justify-between">
          <h3 className={`text-green-primary font-bold text-[24px]`}>
            {t("newsDetail.connectedArticles")}
          </h3>
          <div dir="rtl" className="flex items-center gap-1">
            <button
              ref={nextRef}
              className={`${
                isEnd ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200`}
            >
              <ArrowRight
                width="19"
                height="16"
                className={`mx-auto`}
                color={isEnd ? "#ffffff" : "#008C78"}
              />
            </button>
            <button
              ref={prevRef}
              className={`${
                isBeginning ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200`}
            >
              <ArrowLeft
                width="19"
                height="16"
                className="mx-auto"
                color={isBeginning ? "#ffffff" : "#008C78"}
              />
            </button>
          </div>
        </div>
        <div className="w-full">
          <Swiper
            dir="ltr"
            modules={[Navigation]}
            navigation={true}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            loop={false}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSwiper={(swiper) => {
              if (!slidersLoading) {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }
            }}
            style={{ paddingBlock: "20px" }}
          >
            {slidersLoading
              ? skeletonCount?.map((value, index) => (
                  <SwiperSlide key={index}>
                    <div
                      dir="rtl"
                      className={`w-full p-5 flex flex-col gap-5 rounded-[20px] bg-field-silver`}
                    >
                      <Skeleton className={`h-55 w-full`} />
                      <Skeleton className={`h-7 w-5/10`} />
                      <Skeleton className={`h-14 w-7/10`} />
                      <Skeleton className={`h-7 w-full`} />
                      <Skeleton className={`h-7 w-full`} />
                    </div>
                  </SwiperSlide>
                ))
              : articles?.data?.news?.map((article, index) => (
                  <SwiperSlide key={index}>
                    <Card
                      articleId={article.id}
                      title={article.title}
                      describe={article.describe}
                      categoryName={article.newsCatregoryName}
                      insertDate={article.insertDate}
                      currentView={article.currentView}
                      rate={article.newsRate.avg}
                      image={article.currentImageAddress}
                      isCourseCard={false}
                      view={true}
                      handleAddFavoriteCourse={addFavoriteNewsMutate}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailInformation;
