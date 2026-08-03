import LoadingSvg from "@/core/icons/LoadingSvg";
import { useGetSecuritySetting } from "@/core/services/api/userPanel/userPanel.service";
import ChangePassword from "./SecuritySetting/ChangePassword";
import SecurityInfo from "./SecuritySetting/SecurityInfo";

const SecuritySetting = () => {
  const { isLoading } = useGetSecuritySetting();
  return isLoading ? (
    <LoadingSvg className={`h-full!`} />
  ) : (
    <div className={`flex flex-col gap-10`}>
      <ChangePassword />
      <SecurityInfo />
    </div>
  );
};

export default SecuritySetting;
