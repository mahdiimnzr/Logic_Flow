import { useI18n } from "@/i18n/useI18n";
import { NavLink, Outlet } from "react-router-dom";

const UserInformation = () => {
  const { t } = useI18n();
  return (
    <div className={`flex flex-col 2xl:gap-8 gap-6`}>
      <div className={`flex items-center gap-8`}>
        <NavLink
          to={`/UserPanel/UserInformation/AllInformation`}
          className={({ isActive }) =>
            `rounded-[16px] border ${isActive ? `border-green-primary text-green-primary` : `border-field-silver text-field-silver`} text-base font-normal py-1.5 px-2`
          }
        >
          {t("userPanel.userInfoSection.totalInfo")}
        </NavLink>
        <NavLink
          to={`/UserPanel/UserInformation/LocationInformation`}
          className={({ isActive }) =>
            `rounded-[16px] border ${isActive ? `border-green-primary text-green-primary` : `border-field-silver text-field-silver`} text-base font-normal py-1.5 px-2`
          }
        >
          {t("userPanel.userInfoSection.userLocation")}
        </NavLink>
        <NavLink
          to={`/UserPanel/UserInformation/SocialNetworkInformation`}
          className={({ isActive }) =>
            `rounded-[16px] border ${isActive ? `border-green-primary text-green-primary` : `border-field-silver text-field-silver`} text-base font-normal py-1.5 px-2`
          }
        >
          {t("userPanel.userInfoSection.socialNetwork")}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default UserInformation;
