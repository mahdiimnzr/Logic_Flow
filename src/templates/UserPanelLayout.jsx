import ThemeContext from "@/app/context/ThemeContext";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import ThemeButton from "@/components/molecules/theme/ThemeButton";
import UserPanelSideBar from "@/components/organisms/userPanel/UserPanelSideBar";
import {
  useGetMultiAccount,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import { Accessibility, CircleQuestionMark, House, Menu } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import userProfile from "/Profile.png";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n/useI18n";
import DrawerComponents from "@/components/molecules/Drawer/Drawer";
import {
  TourControlProvider,
  useTourControl,
} from "@/components/molecules/TourStep/TourProvider";
import LoginContext from "@/app/context/LoginContext";
import { toast } from "react-toastify";
import AddMultiAccountModal from "@/components/organisms/userPanel/MultiAcconts/AddMultiAccountModal";
import MultiAccountsModal from "@/components/organisms/userPanel/MultiAcconts/MultiAccountsModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useA11y } from "@/hooks/useA11y";

const UserPanelContent = () => {
  const navigate = useNavigate();
  const { openRef } = useTourControl();
  const { lang, changeLang, t } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const { isLogin } = useContext(LoginContext);
  const { isA11yMode, toggleA11yMode } = useA11y();
  const { isLoading, data: userDetail } = useGetUserDetail();
  const { data: MultiAccount } = useGetMultiAccount();
  const [multiModal, setMultiModal] = useState(false);
  const [addAccountOpen, setAddAccountOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => openRef.current?.(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
      toast.warn("برای ورود به پنل لاگین کنید");
    }
  }, []);
  return (
    <div
      className={`min-h-screen bg-default-light content-center md:py-4 py-2`}
    >
      <DrawerComponents
        trigger={
          <div
            className={`size-11.5 bg-green-primary z-100 rounded-full content-center cursor-pointer lg:hidden fixed ${lang === "en" ? "right-5" : "left-5"} bottom-5`}
          >
            <Menu className={`mx-auto`} color={"white"} />
          </div>
        }
        contentClassName={`${theme ? `bg-[#1e1e1e] border-[#0f0f0f]` : `bg-white border-[#f5f5f5]`} w-full`}
        primitiveClassName={`${theme ? `bg-[#0f0f0f]` : `bg-[#f5f5f5]`}`}
      >
        <div
          className={`rounded-[40px] p-4 flex flex-col gap-4 no-scrollbar overflow-y-auto`}
        >
          <UserPanelSideBar />
        </div>
      </DrawerComponents>
      <div
        className={`min-h-[calc(100vh-64px)] w-[95%] mx-auto flex justify-center lg:gap-8 gap-6`}
      >
        <div
          className={`xl:w-2/10 w-3/10 bg-background-default rounded-[40px] lg:p-6 p-4 lg:flex hidden flex-col gap-8`}
        >
          <UserPanelSideBar />
        </div>
        <div
          className={`xl:w-8/10 lg:w-7/10 w-full flex flex-col md:gap-8 gap-4`}
        >
          <div
            className={`bg-background-default rounded-[32px] md:py-4 py-3 md:px-6 px-3 flex items-center justify-between`}
          >
            <div
              className={`flex items-center lg:gap-4 gap-2 group cursor-pointer`}
            >
              {isLoading ? (
                <div className={`bg-field-silver p-0.5 rounded-full`}>
                  <Skeleton className={`lg:size-14 md:size-12 size-11`} />
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ImageFallback
                      className={`lg:size-15 border-transparent md:size-12 size-11 rounded-full transition-all duration-300 border-2 group-hover:border-green-primary group-hover:scale-105`}
                      src={userDetail?.data?.currentPictureAddress}
                      fallback={userProfile}
                      onClick={() => setMultiModal(true)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("userPanel.tooltip.management")}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {isLoading ? (
                <div
                  className={`bg-field-silver p-0.5 rounded-[8px] hidden md:block`}
                >
                  <Skeleton className={`h-5 w-20`} />
                </div>
              ) : (
                <span
                  className={`lg:text-[20px] md:text-base text-[14px] truncate w-9/10 font-normal text-default-black hidden md:block`}
                >
                  {userDetail?.data?.fName} {userDetail?.data?.lName}
                </span>
              )}
            </div>
            <div className={`flex items-center lg:gap-5 md:gap-4 gap-2.5`}>
              <Tooltip>
                <TooltipTrigger>
                  <CircleQuestionMark
                    onClick={() => openRef.current?.(true)}
                    color="#008C78"
                    className={`cursor-pointer `}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("userPanel.tooltip.help")}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={toggleA11yMode}
                    className={`cursor-pointer lg:size-14 md:size-12 size-11 rounded-full items-center justify-center transition-all duration-300 flex ${
                      isA11yMode
                        ? "bg-green-primary text-white shadow-lg shadow-green-primary/30"
                        : "bg-default-light text-default-black hover:text-green-primary"
                    }`}
                  >
                    <Accessibility
                      size={22}
                      color={
                        isA11yMode ? "#ffffff" : theme ? "#ffffff" : "#008c78"
                      }
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
                  <div
                    onClick={() =>
                      lang === "en" ? changeLang("fa") : changeLang("en")
                    }
                    className={`cursor-pointer lg:size-14 md:size-12 size-11 rounded-full bg-green-primary content-center text-center text-white md:text-[18px] text-[14px] font-bold border lg:leading-14 md:leading-12 leading-9 border-green-primary`}
                  >
                    {lang === "en" ? "EN" : "FA"}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p> {t("userPanel.tooltip.language")}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ThemeButton
                    theme={theme}
                    setTheme={setTheme}
                    sunClassName={`md:size-7! size-5!`}
                    moonClassName={`md:size-7! size-5!`}
                    className={`lg:size-14! md:size-12! size-11!`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`${theme ? t("userPanel.tooltip.dayMode") : t("userPanel.tooltip.nightMode")}`}</p>
                </TooltipContent>
              </Tooltip>
              <Link
                to={"/"}
                className={`lg:size-14 md:size-12 size-11 rounded-full bg-green-primary content-center`}
              >
                <House className={`mx-auto md:size-7 size-5`} color="#FFFFFF" />
              </Link>
            </div>
          </div>
          <div
            className={`h-full bg-background-default pt-8 pb-6 md:px-8 px-4 rounded-[40px]`}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <MultiAccountsModal
        isOpen={multiModal}
        setIsOpen={setMultiModal}
        setAddAccountOpen={setAddAccountOpen}
        MultiAccount={MultiAccount?.data}
      />
      <AddMultiAccountModal
        isOpen={addAccountOpen}
        setIsOpen={setAddAccountOpen}
        setMultiModal={setMultiModal}
      />
    </div>
  );
};
const UserPanelLayout = () => {
  return (
    <TourControlProvider>
      <UserPanelContent />
    </TourControlProvider>
  );
};

export default UserPanelLayout;
