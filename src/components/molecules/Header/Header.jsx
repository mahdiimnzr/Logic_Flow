import navigation from "@/core/constants/navigation";
import logoIcon from "/logoIcon.png";
import { Link, NavLink } from "react-router-dom";
import Button from "@/components/atoms/Buttons/Button";
import SearchHeader from "../Inputs/SearchHeader";
import ThemeButton from "../theme/ThemeButton";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import { Bell, Menu, Search, X, Accessibility } from "lucide-react";
import DrawerComponents from "../Drawer/Drawer";
import InstagramIcon from "@/core/icons/InstagramIcon";
import FaceBookIcon from "@/core/icons/FaceBookIcon";
import TwitterIcon from "@/core/icons/TwitterIcon";
import TelegramIcon from "@/core/icons/TelegramIcon";
import WhatsAppIcon from "@/core/icons/WhatsAppIcon";
import useGetCourses from "@/core/services/api/hooks/useGetCourse";
import debounce from "debounce";
import { Skeleton } from "@/components/ui/skeleton";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import image from "../../../assets/images/coursePng.png";
import Border from "@/components/atoms/Border/Border";
import ArrowIcon from "@/core/icons/ArrowIcon";
import useGetArticles from "@/core/services/api/hooks/useGetArticles";
import { useI18n } from "@/i18n/useI18n";
import LoginContext from "@/app/context/LoginContext";
import { useGetUserDetail } from "@/core/services/api/userPanel/userPanel.service";
import userProfile from "/Profile.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetUnSeenNotifications } from "@/core/services/api/landing/landing.service";
import NotificationContext from "@/app/context/NotificationContext";
import { useA11y } from "@/hooks/useA11y";

const Header = () => {
  const { isLogin } = useContext(LoginContext);
  const { setNotificationOpen } = useContext(NotificationContext);
  const headerRef = useRef(null);
  const skeletonCount = new Array(3).fill("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("courses");
  const [searchHeaderValue, setSearchHeaderValue] = useState("");
  const [params, setParams] = useState({
    RowsOfPage: 3,
    Query: null,
  });
  const { t, lang } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const { data: userDetail } = useGetUserDetail();
  const { data } = useGetUnSeenNotifications();
  const { isA11yMode, toggleA11yMode } = useA11y();
  const {
    isLoading,
    data: courses,
    refetch: coursesRefetch,
  } = useGetCourses("FundedCourses", params);
  const { data: articles, refetch: articlesRefetch } = useGetArticles(
    "FundedArticles",
    params,
  );
  const updateParams = (key, value) => {
    const newParams = { ...params, [key]: value };
    return setParams(newParams);
  };
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
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 300) {
        headerRef.current.classList.add("bg-background-default!");
        headerRef.current.style.position = "fixed";
        headerRef.current.style.right = "50%";
        headerRef.current.style.transform = "translateX(50%)";
      } else {
        headerRef.current.classList.remove("bg-background-default!");
        headerRef.current.style.position = "absolute";
        headerRef.current.style.right = "0%";
        headerRef.current.style.transform = "translateX(0%)";
      }
    };
  });
  return (
    <div
      ref={headerRef}
      className={`w-full flex justify-between items-center md:px-[2%] px-[4%] md:py-6 py-3 mx-auto absolute top-0 z-100 bg-transparent`}
    >
      <div className={`flex items-center xl:gap-8 gap-6`}>
        <div className={`flex items-center xl:gap-4 md:gap-3`}>
          <img className={`size-11.5`} src={logoIcon} />
          <span
            className={`2xl:text-2xl xl:text-[20px] font-bold text-default-black hidden lg:block`}
          >
            {t("header.acName")}
          </span>
        </div>
        <div
          className={`lg:flex items-center 2xl:gap-5 xl:gap-4 lg:gap-3 hidden`}
        >
          {navigation?.map((value, index) => (
            <NavLink
              key={index}
              to={value.link}
              className={({ isActive }) =>
                `${isActive ? `text-green-primary font-bold` : `text-default-black font-normal`} 2xl:text-[20px] xl:text-[18px]`
              }
            >
              {lang === "en" ? value?.titleEn : value?.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={`flex items-center 2xl:gap-5 xl:gap-4 md:gap-3 gap-2`}>
        {data?.data.success === false ? null : (
          <div
            onClick={() => setNotificationOpen(true)}
            className="hidden relative size-11 rounded-full bg-default-light hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer lg:flex items-center justify-center group"
          >
            <Bell
              size={22}
              className="text-default-black hover:text-green-primary transition-all"
            />
            <div className=" border-2 border-default-light absolute -bottom-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-danger text-default-light text-[10px] font-semibold flex items-center justify-center">
              {data?.data?.length ?? 0}
            </div>
          </div>
        )}

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={toggleA11yMode}
              className={`cursor-pointer xl:size-11.5! lg:size-10! size-11.5! rounded-full lg:flex items-center justify-center transition-all duration-300 hidden ${
                isA11yMode
                  ? "bg-green-primary text-white shadow-lg shadow-green-primary/30"
                  : "bg-default-light text-default-black hover:text-green-primary"
              }`}
            >
              <Accessibility
                size={22}
                color={isA11yMode ? "#ffffff" : theme ? "#ffffff" : "#008c78"}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className={"z-5000! relative"}>
            {isA11yMode
              ? t("userPanel.tooltip.accessibilityOn")
              : t("userPanel.tooltip.accessibilityOff")}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ThemeButton
              className={`xl:size-11.5! lg:size-10! size-11.5!`}
              sunClassName={`xl:size-6 lg:size-5 size-6!`}
              moonClassName={`xl:w-5 xl:h-6 w-5! h-6!`}
              theme={theme}
              setTheme={setTheme}
            />
          </TooltipTrigger>
          <TooltipContent className={"z-5000! relative"}>
            <p>{`${theme ? t("userPanel.tooltip.dayMode") : t("userPanel.tooltip.nightMode")}`}</p>
          </TooltipContent>
        </Tooltip>

        <SearchHeader
          buttonClassName={`xl:size-11.5 md:size-10`}
          placeHolder={t("header.inputPlaceHolder")}
          haveSelect={true}
          className={`lg:w-70 hidden md:flex relative`}
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
            className={`mx-auto xl:size-6 md:size-5`}
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
                  {isLoading ? (
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
                  ? courses?.data?.courseFilterDtos
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
        {!isLogin ? (
          <Link to={"/Auth/Login"} className={`rounded-[50px]`}>
            <Button
              color={"registerBtn"}
              className={`xl:px-6 py-3 px-4 text-[14px]!`}
            >
              {t("header.registerBtn")}
            </Button>
          </Link>
        ) : (
          <Link
            to={"/UserPanel/Dashboard"}
            className={`rounded-full size-11.5 max-w-11.5 max-h-11.5`}
          >
            <ImageFallback
              className={`size-full rounded-full border-2 border-green-primary box-border`}
              src={userDetail?.data?.currentPictureAddress}
              fallback={userProfile}
            />
          </Link>
        )}
        <DrawerComponents
          trigger={
            <div
              className={`size-11.5 bg-green-primary rounded-full content-center cursor-pointer lg:hidden`}
            >
              <Menu className={`mx-auto`} color={theme ? "black" : "white"} />
            </div>
          }
          contentClassName={`${theme ? `bg-[#1e1e1e] border-[#0f0f0f]` : `bg-white border-[#f5f5f5]`} w-full`}
          primitiveClassName={`${theme ? `bg-[#0f0f0f]` : `bg-[#f5f5f5]`}`}
          footer={
            <div className={`flex items-center justify-between`}>
              <div className={`flex items-center gap-3`}>
                <img className={`sm:size-11.5 size-10`} src={logoIcon} />
                <span
                  className={`text-[20px] hidden sm:block font-bold ${theme ? "text-white" : "text-[#848484]"}`}
                >
                  آکادمی بحر
                </span>
              </div>
              <div className={`flex items-center md:gap-6 gap-3`}>
                <InstagramIcon color={theme ? "white" : "#848484"} />
                <FaceBookIcon color={theme ? "white" : "#848484"} />
                <TwitterIcon color={theme ? "white" : "#848484"} />
                <TelegramIcon color={theme ? "white" : "#848484"} />
                <WhatsAppIcon color={theme ? "white" : "#848484"} />
              </div>
            </div>
          }
        >
          <div className={`flex flex-col gap-3 p-4`}>
            <div className="flex items-center gap-2">
              {data?.data.success === false ? null : (
                <div
                  onClick={() => setNotificationOpen(true)}
                  className="border-light-gray border relative size-11 rounded-full bg-default-light hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer flex items-center justify-center group"
                >
                  <Bell
                    size={22}
                    className="text-default-black hover:text-green-primary transition-all"
                  />
                  <div className=" border-2 border-default-light absolute -bottom-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-danger text-default-light text-[10px] font-semibold flex items-center justify-center">
                    {data?.data?.length ?? 0}
                  </div>
                </div>
              )}
              <div
                onClick={toggleA11yMode}
                className={`cursor-pointer border-light-gray border xl:size-11.5! lg:size-10! size-11.5! rounded-full flex items-center justify-center transition-all duration-300 ${
                  isA11yMode
                    ? "bg-green-primary text-white shadow-lg shadow-green-primary/30"
                    : "bg-default-light text-default-black hover:text-green-primary"
                }`}
              >
                <Accessibility
                  size={22}
                  color={isA11yMode ? "#ffffff" : theme ? "#ffffff" : "#008c78"}
                />
              </div>
            </div>
            {navigation?.map((value, index) => (
              <div className={`flex items-center justify-between`}>
                <NavLink
                  key={index}
                  to={value.link}
                  className={({ isActive }) =>
                    `${isActive ? `text-[#008c78] font-bold` : theme ? `text-white font-normal` : `text-[#1e1e1e] font-normal`} 2xl:text-[20px] xl:text-[18px]`
                  }
                >
                  {lang === "en" ? value?.titleEn : value?.title}
                </NavLink>
                <p
                  className={`text-[#848484] font-normal text-base w-4/10 text-left truncate`}
                >
                  {value.describe}
                </p>
              </div>
            ))}
          </div>
        </DrawerComponents>
      </div>
    </div>
  );
};

export default Header;
