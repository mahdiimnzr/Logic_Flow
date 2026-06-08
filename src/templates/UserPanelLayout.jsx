import ThemeContext from "@/app/context/ThemeContext";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import ThemeButton from "@/components/molecules/theme/ThemeButton";
import UserPanelSideBar from "@/components/organisms/userPanel/UserPanelSideBar";
import { useGetUserDetail } from "@/core/services/api/userPanel/userPanel.service";
import { House } from "lucide-react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import userProfile from "../assets/images/userProfile.png";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n/useI18n";

const UserPanelLayout = () => {
  const { lang, changeLang } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);

  const { isLoading, data: userDetail } = useGetUserDetail();

  return (
    <div className={`min-h-screen bg-default-light content-center`}>
      <div
        className={`min-h-[calc(100vh-64px)] w-[95%] mx-auto flex justify-center gap-8`}
      >
        <UserPanelSideBar />
        <div className={`w-8/10 flex flex-col gap-8`}>
          <div
            className={`bg-background-default rounded-[32px] py-4 px-6 flex items-center justify-between`}
          >
            <div className={`flex items-center gap-4`}>
              {isLoading ? (
                <div className={`bg-field-silver p-0.5 rounded-full`}>
                  <Skeleton className={`size-14`} />
                </div>
              ) : (
                <ImageFallback
                  className={`size-14 rounded-full`}
                  src={userDetail?.data?.currentPictureAddress}
                  fallback={userProfile}
                />
              )}
              {isLoading ? (
                <div className={`bg-field-silver p-0.5 rounded-[8px]`}>
                  <Skeleton className={`h-5 w-20`} />
                </div>
              ) : (
                <span className={`text-[20px] font-normal text-default-black`}>
                  {userDetail?.data?.fName} {userDetail?.data?.lName}
                </span>
              )}
            </div>
            <div className={`flex items-center gap-7`}>
              <div
                onClick={() =>
                  lang === "en" ? changeLang("fa") : changeLang("en")
                }
                className={`cursor-pointer size-14 rounded-full bg-green-primary content-center text-center text-white text-[18px] font-bold border leading-14 border-green-primary`}
              >
                {lang === "en" ? "EN" : "FA"}
              </div>
              <ThemeButton theme={theme} setTheme={setTheme} />
              <Link
                to={"/"}
                className={`size-14 rounded-full bg-green-primary content-center`}
              >
                <House className={`mx-auto size-7`} color="#FFFFFF" />
              </Link>
            </div>
          </div>
          <div
            className={`h-full bg-background-default pt-8 pb-6 px-8 rounded-[40px]`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelLayout;
