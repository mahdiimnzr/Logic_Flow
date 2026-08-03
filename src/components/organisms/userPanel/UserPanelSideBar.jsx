import CommentsIcon from "@/core/icons/CommentsIcon";
import DashboardIcon from "@/core/icons/DashboardIcon";
import FavoritePanelIcon from "@/core/icons/FavoritePanelIcon";
import LogOutIcon from "@/core/icons/LogOutIcon";
import MyCoursesIcon from "@/core/icons/MyCoursesIcon";
import PaymentsIcon from "@/core/icons/PaymentsIcon";
import ReserveCoursesIcon from "@/core/icons/ReserveCoursesIcon";
import SecuritySettingIcon from "@/core/icons/SecuritySettingIcon";
import UserInfoIcon from "@/core/icons/UserInfoIcon";
import { useI18n } from "@/i18n/useI18n";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "/logoIcon.png";
import { useContext } from "react";
import LoginContext from "@/app/context/LoginContext";
import { Bell, NotebookPen, School, Ticket } from "lucide-react";

const UserPanelSideBar = () => {
  const { setIsLogin } = useContext(LoginContext);
  const { t, lang } = useI18n();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("notifications");
    setIsLogin(false);
    toast.success("شما از حساب خود خارج شدید!");
    navigate("/");
  };
  return (
    <>
      <div className={`flex items-center gap-4`}>
        <img className={`rounded-full size-11.5`} src={logo} />
        <span
          className={`text-default-black lg:text-2xl text-[18px] font-bold`}
        >
          {t("userPanel.brand")}
        </span>
      </div>
      <div className={`flex flex-col gap-4`}>
        <span className={`text-base text-field-silver font-normal`}>
          {t("userPanel.menu")}
        </span>
        <div className={`flex flex-col gap-6`}>
          <NavLink
            to={"/UserPanel/Dashboard"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/Dashboard" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <DashboardIcon
              color={
                pathname === "/UserPanel/Dashboard" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${pathname !== "/UserPanel/Dashboard" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.dashboard")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/UserInformation"}
            className={`flex items-center gap-4 relative`}
          >
            {(pathname === "/UserPanel/UserInformation/AllInformation" ||
              pathname === "/UserPanel/UserInformation/LocationInformation" ||
              pathname ===
                "/UserPanel/UserInformation/SocialNetworkInformation") && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <UserInfoIcon
              color={
                pathname === "/UserPanel/UserInformation/AllInformation" ||
                pathname === "/UserPanel/UserInformation/LocationInformation" ||
                pathname ===
                  "/UserPanel/UserInformation/SocialNetworkInformation"
                  ? "#008C78"
                  : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${
                pathname === "/UserPanel/UserInformation/AllInformation" ||
                pathname === "/UserPanel/UserInformation/LocationInformation" ||
                pathname ===
                  "/UserPanel/UserInformation/SocialNetworkInformation"
                  ? "font-semibold text-default-black"
                  : "font-normal text-field-silver"
              }`}
            >
              {t("userPanel.userInfo")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/MyCourses"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/MyCourses" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <MyCoursesIcon
              color={
                pathname === "/UserPanel/MyCourses" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${pathname !== "/UserPanel/MyCourses" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.myCourses")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/ReservedCourses"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/ReservedCourses" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <ReserveCoursesIcon
              color={
                pathname === "/UserPanel/ReservedCourses"
                  ? "#008C78"
                  : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${pathname !== "/UserPanel/ReservedCourses" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.reservedCourses")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/MyPayments"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/MyPayments" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <PaymentsIcon
              color={
                pathname === "/UserPanel/MyPayments" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${pathname !== "/UserPanel/MyPayments" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.myPayments")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/MyComments"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/MyComments" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <CommentsIcon
              color={
                pathname === "/UserPanel/MyComments" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${
                pathname === "/UserPanel/MyComments"
                  ? "font-semibold text-default-black"
                  : "font-normal text-field-silver"
              }`}
            >
              {t("userPanel.myComments")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/MyFavorite"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/MyFavorite" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <FavoritePanelIcon
              color={
                pathname === "/UserPanel/MyFavorite" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${
                pathname === "/UserPanel/MyFavorite"
                  ? "font-semibold text-default-black"
                  : "font-normal text-field-silver"
              }`}
            >
              {t("userPanel.myFavorite")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/MyClasses"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/MyClasses" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <School
              color={
                pathname === "/UserPanel/MyClasses" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${
                pathname === "/UserPanel/MyClasses"
                  ? "font-semibold text-default-black"
                  : "font-normal text-field-silver"
              }`}
            >
              {t("userPanel.myClasses")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/MyHomeWorks"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/MyHomeWorks" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <NotebookPen
              color={
                pathname === "/UserPanel/MyHomeWorks" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${
                pathname === "/UserPanel/MyHomeWorks"
                  ? "font-semibold text-default-black"
                  : "font-normal text-field-silver"
              }`}
            >
              {t("userPanel.myHomeWorks")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/Notifications"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/Notifications" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <Bell
              color={
                pathname === "/UserPanel/Notifications" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${pathname !== "/UserPanel/Notifications" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.notifications.notifications")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/MyTickets"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/MyTickets" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <Ticket
              color={
                pathname === "/UserPanel/MyTickets" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${pathname !== "/UserPanel/MyTickets" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.tickets.myTickets")}
            </span>
          </NavLink>
        </div>
      </div>
      <div className={`flex flex-col gap-4`}>
        <span className={`text-base text-field-silver font-normal`}>
          {t("userPanel.public")}
        </span>
        <div className={`flex flex-col gap-6`}>
          <NavLink
            to={"/UserPanel/SecuritySetting"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/SecuritySetting" && (
              <div
                className={`2xl:h-11 h-10 xl:w-2 w-1.5 bg-green-primary absolute md:block hidden 2xl:-top-1.5 -top-2 ${lang === "en" ? `lg:-left-6 -left-4 rounded-r-[8px]` : `lg:-right-6 -right-4 rounded-l-[8px]`}`}
              ></div>
            )}
            <SecuritySettingIcon
              color={
                pathname === "/UserPanel/SecuritySetting"
                  ? "#008C78"
                  : "#848484"
              }
            />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] ${pathname !== "/UserPanel/SecuritySetting" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.securitySetting")}
            </span>
          </NavLink>
          <div
            onClick={handleLogout}
            className={`flex items-center gap-4 relative cursor-pointer`}
          >
            <LogOutIcon color={"#848484"} />
            <span
              className={`2xl:text-[18px] lg:text-base text-[14px] font-normal text-field-silver`}
            >
              {t("userPanel.logout")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPanelSideBar;
