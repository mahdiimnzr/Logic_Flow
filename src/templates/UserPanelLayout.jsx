import ThemeContext from "@/app/context/ThemeContext";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import ThemeButton from "@/components/molecules/theme/ThemeButton";
import UserPanelSideBar from "@/components/organisms/userPanel/UserPanelSideBar";
import { useGetUserDetail } from "@/core/services/api/userPanel/userPanel.service";
import { House, Menu } from "lucide-react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import userProfile from "/Profile.png";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n/useI18n";
import DrawerComponents from "@/components/molecules/Drawer/Drawer";

const UserPanelLayout = () => {
  const { lang, changeLang } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);

  const { isLoading, data: userDetail } = useGetUserDetail();

  return (
    <div
      className={`min-h-screen bg-default-light content-center md:py-4 py-2`}
    >
      <DrawerComponents
        trigger={
          <div
            className={`size-11.5 bg-green-primary rounded-full content-center cursor-pointer md:hidden fixed ${lang === "en" ? "left-5" : "right-5"} bottom-5`}
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
          className={`xl:w-2/10 w-3/10 bg-background-default rounded-[40px] lg:p-6 p-4 md:flex hidden flex-col gap-8`}
        >
          <UserPanelSideBar />
        </div>
        <div
          className={`xl:w-8/10 md:w-7/10 w-full flex flex-col md:gap-8 gap-4`}
        >
          <div
            className={`bg-background-default rounded-[32px] py-4 md:px-6 px-3 flex items-center justify-between`}
          >
            <div className={`flex items-center lg:gap-4 gap-2`}>
              {isLoading ? (
                <div className={`bg-field-silver p-0.5 rounded-full`}>
                  <Skeleton className={`lg:size-14 md:size-12 size-9`} />
                </div>
              ) : (
                <ImageFallback
                  className={`lg:size-14 md:size-12 size-9 rounded-full`}
                  src={userDetail?.data?.currentPictureAddress}
                  fallback={userProfile}
                />
              )}
              {isLoading ? (
                <div className={`bg-field-silver p-0.5 rounded-[8px]`}>
                  <Skeleton className={`h-5 w-20`} />
                </div>
              ) : (
                <span
                  className={`lg:text-[20px] md:text-base text-[14px] truncate w-9/10 font-normal text-default-black`}
                >
                  {userDetail?.data?.fName} {userDetail?.data?.lName}
                </span>
              )}
            </div>
            <div className={`flex items-center lg:gap-7 md:gap-4 gap-2`}>
              <div
                onClick={() =>
                  lang === "en" ? changeLang("fa") : changeLang("en")
                }
                className={`cursor-pointer lg:size-14 md:size-12 size-9 rounded-full bg-green-primary content-center text-center text-white md:text-[18px] text-[14px] font-bold border lg:leading-14 md:leading-12 leading-9 border-green-primary`}
              >
                {lang === "en" ? "EN" : "FA"}
              </div>
              <ThemeButton
                theme={theme}
                setTheme={setTheme}
                sunClassName={`md:size-7! size-5!`}
                moonClassName={`md:size-7! size-5!`}
                className={`lg:size-14! md:size-12! size-9!`}
              />
              <Link
                to={"/"}
                className={`lg:size-14 md:size-12 size-9 rounded-full bg-green-primary content-center`}
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
    </div>
  );
};

export default UserPanelLayout;
