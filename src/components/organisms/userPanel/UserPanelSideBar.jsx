import AccordionMultiple from "@/components/molecules/Accordion/Accordions";
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

const UserPanelSideBar = () => {
  const { t, lang } = useI18n();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("شما از حساب خود خارج شدید!");
    navigate("/");
  };
  return (
    <div
      className={`w-2/10 bg-background-default rounded-[40px] p-6 flex flex-col gap-8`}
    >
      <div className={`flex items-center gap-4`}>
        <img className={`rounded-full size-11.5`} src={logo} />
        <span className={`text-default-black text-2xl font-bold`}>
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
                className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
              ></div>
            )}
            <DashboardIcon
              color={
                pathname === "/UserPanel/Dashboard" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`text-[20px] ${pathname !== "/UserPanel/Dashboard" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.dashboard")}
            </span>
          </NavLink>
          <NavLink
            to={"/UserPanel/UserInformation"}
            className={`flex items-center gap-4 relative`}
          >
            {pathname === "/UserPanel/UserInformation" && (
              <div
                className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
              ></div>
            )}
            <UserInfoIcon
              color={
                pathname === "/UserPanel/UserInformation"
                  ? "#008C78"
                  : "#848484"
              }
            />
            <span
              className={`text-[20px] ${pathname !== "/UserPanel/UserInformation" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
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
                className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
              ></div>
            )}
            <MyCoursesIcon
              color={
                pathname === "/UserPanel/MyCourses" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`text-[20px] ${pathname !== "/UserPanel/MyCourses" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
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
                className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
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
              className={`text-[20px] ${pathname !== "/UserPanel/ReservedCourses" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
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
                className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
              ></div>
            )}
            <PaymentsIcon
              color={
                pathname === "/UserPanel/MyPayments" ? "#008C78" : "#848484"
              }
            />
            <span
              className={`text-[20px] ${pathname !== "/UserPanel/MyPayments" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.myPayments")}
            </span>
          </NavLink>
          <AccordionMultiple
            defaultValue={false}
            value={"myComments"}
            className={`border-none!`}
            trigger={
              <NavLink
                to={"/UserPanel/MyComments"}
                className={`flex items-center gap-4 relative`}
              >
                {(pathname === "/UserPanel/MyComments/Course" ||
                  pathname === "/UserPanel/MyComments/Articles") && (
                  <div
                    className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
                  ></div>
                )}
                <CommentsIcon
                  color={
                    pathname === "/UserPanel/MyComments/Course" ||
                    pathname === "/UserPanel/MyComments/Articles"
                      ? "#008C78"
                      : "#848484"
                  }
                />
                <span
                  className={`text-[20px] ${
                    pathname === "/UserPanel/MyComments/Course" ||
                    pathname === "/UserPanel/MyComments/Articles"
                      ? "font-semibold text-default-black"
                      : "font-normal text-field-silver"
                  }`}
                >
                  {t("userPanel.myComments")}
                </span>
              </NavLink>
            }
            triggerClassName={`hover:no-underline! p-0! items-center! cursor-pointer! text-field-silver! text-[20px]! font-semibold! text-right!`}
          >
            <div className={`flex flex-col gap-4 mt-4`}>
              <NavLink
                to={"/UserPanel/MyComments/Course"}
                className={`flex items-center gap-4 relative no-underline!`}
              >
                {pathname === "/UserPanel/MyComments/Course" && (
                  <div
                    className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
                  ></div>
                )}
                <div
                  className={
                    pathname === "/UserPanel/MyComments/Course"
                      ? "size-3.5 border-2 border-green-primary rounded-full"
                      : "size-3.5 border-2 border-field-silver rounded-full"
                  }
                />
                <span
                  className={`text-[20px] ${pathname !== "/UserPanel/MyComments/Course" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
                >
                  {t("userPanel.courseComments")}
                </span>
              </NavLink>
              <NavLink
                to={"/UserPanel/MyComments/Articles"}
                className={`flex items-center gap-4 relative no-underline!`}
              >
                {pathname === "/UserPanel/MyComments/Articles" && (
                  <div
                    className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
                  ></div>
                )}
                <div
                  className={
                    pathname === "/UserPanel/MyComments/Articles"
                      ? "size-3.5 border-2 border-green-primary rounded-full"
                      : "size-3.5 border-2 border-field-silver rounded-full"
                  }
                />
                <span
                  className={`text-[20px] ${pathname !== "/UserPanel/MyComments/Articles" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
                >
                  {t("userPanel.articlesComments")}
                </span>
              </NavLink>
            </div>
          </AccordionMultiple>
          <AccordionMultiple
            defaultValue={false}
            value={"myFavorites"}
            className={`border-none!`}
            trigger={
              <NavLink
                to={"/UserPanel/MyFavorite"}
                className={`flex items-center gap-4 relative`}
              >
                {(pathname === "/UserPanel/MyFavorite/Course" ||
                  pathname === "/UserPanel/MyFavorite/Articles") && (
                  <div
                    className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
                  ></div>
                )}
                <FavoritePanelIcon
                  color={
                    pathname === "/UserPanel/MyFavorite/Course" ||
                    pathname === "/UserPanel/MyFavorite/Articles"
                      ? "#008C78"
                      : "#848484"
                  }
                />
                <span
                  className={`text-[20px] ${
                    pathname === "/UserPanel/MyFavorite/Course" ||
                    pathname === "/UserPanel/MyFavorite/Articles"
                      ? "font-semibold text-default-black"
                      : "font-normal text-field-silver"
                  }`}
                >
                  {t("userPanel.myFavorite")}
                </span>
              </NavLink>
            }
            triggerClassName={`hover:no-underline! p-0! items-center! cursor-pointer! text-field-silver! text-[20px]! font-semibold! text-right!`}
          >
            <div className={`flex flex-col gap-4 mt-4`}>
              <NavLink
                to={"/UserPanel/MyFavorite/Course"}
                className={`flex items-center gap-4 relative no-underline!`}
              >
                {pathname === "/UserPanel/MyFavorite/Course" && (
                  <div
                    className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
                  ></div>
                )}
                <div
                  className={
                    pathname === "/UserPanel/MyFavorite/Course"
                      ? "size-3.5 border-2 border-green-primary rounded-full"
                      : "size-3.5 border-2 border-field-silver rounded-full"
                  }
                />
                <span
                  className={`text-[20px] ${pathname !== "/UserPanel/MyFavorite/Course" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
                >
                  {t("userPanel.coursesFavorite")}
                </span>
              </NavLink>
              <NavLink
                to={"/UserPanel/MyFavorite/Articles"}
                className={`flex items-center gap-4 relative no-underline!`}
              >
                {pathname === "/UserPanel/MyFavorite/Articles" && (
                  <div
                    className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
                  ></div>
                )}
                <div
                  className={
                    pathname === "/UserPanel/MyFavorite/Articles"
                      ? "size-3.5 border-2 border-green-primary rounded-full"
                      : "size-3.5 border-2 border-field-silver rounded-full"
                  }
                />
                <span
                  className={`text-[20px] ${pathname !== "/UserPanel/MyFavorite/Articles" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
                >
                  {t("userPanel.articlesFavorite")}
                </span>
              </NavLink>
            </div>
          </AccordionMultiple>
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
                className={`h-11 w-2 bg-green-primary absolute -top-1.5 ${lang === "en" ? `-left-6 rounded-r-[8px]` : `-right-6 rounded-l-[8px]`}`}
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
              className={`text-[20px] ${pathname !== "/UserPanel/SecuritySetting" ? "font-normal text-field-silver" : "font-semibold text-default-black"}`}
            >
              {t("userPanel.securitySetting")}
            </span>
          </NavLink>
          <div
            onClick={handleLogout}
            className={`flex items-center gap-4 relative cursor-pointer`}
          >
            <LogOutIcon color={"#848484"} />
            <span className={`text-[20px] font-normal text-field-silver`}>
              {t("userPanel.logout")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelSideBar;
