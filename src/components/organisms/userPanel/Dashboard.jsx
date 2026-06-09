import { Skeleton } from "@/components/ui/skeleton";
import ToLinkIcon from "@/core/icons/ToLinkIcon";
import {
  useGetMyCourses,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const { t } = useI18n();
  const { isLoading, data: userDetail } = useGetUserDetail();
  const { isLoading: courseLoading, data: courses } = useGetMyCourses(
    "dashboardMyCourses",
    { PageNumber: "1", RowsOfPage: "10" },
  );

  const courseNotPay = useMemo(() => {
    return (
      courses?.data?.listOfMyCourses?.filter(
        (value) => value.paymentStatus === "پرداخت نشده",
      ) ?? []
    );
  }, [courses]);
  return (
    <div className={`flex flex-col gap-8`}>
      <div className={`grid grid-cols-3 gap-8`}>
        <div
          className={`px-6 py-4 flex flex-col gap-4 bg-default-light rounded-[20px]`}
        >
          <div className={`flex items-center gap-4`}>
            <span className={`text-[20px] text-default-black font-normal`}>
              {t("userPanel.dashboardSection.myCourses")}
            </span>
            <Link to={"/UserPanel/MyCourses"}>
              <ToLinkIcon />
            </Link>
          </div>
          {courseLoading ? (
            <div className={`p-0.5 bg-field-silver rounded-[8px] w-fit`}>
              <Skeleton className={`rounded-[5px] h-5 w-10`} />
            </div>
          ) : (
            <span className={`text-[48px] font-normal text-green-primary`}>
              {courses?.data?.totalCount}
            </span>
          )}
        </div>
        <div
          className={`px-6 py-4 flex flex-col gap-4 bg-default-light rounded-[20px]`}
        >
          <div className={`flex items-center gap-4`}>
            <span className={`text-[20px] text-default-black font-normal`}>
              {t("userPanel.dashboardSection.notPayCourses")}
            </span>
            <Link to={"/UserPanel/MyPayments"}>
              <ToLinkIcon />
            </Link>
          </div>
          {courseLoading ? (
            <div className={`p-0.5 bg-field-silver rounded-[8px] w-fit`}>
              <Skeleton className={`rounded-[5px] h-5 w-10`} />
            </div>
          ) : (
            <span className={`text-[48px] font-normal text-green-primary`}>
              {courseNotPay?.length}
            </span>
          )}
        </div>
        <div
          className={`px-6 py-4 flex justify-between gap-4 bg-default-light rounded-[20px]`}
        >
          <div className={`flex gap-4`}>
            <span className={`text-[20px] text-default-black font-normal`}>
              {t("userPanel.dashboardSection.profileCompleted")}
            </span>
            <Link to={"/UserPanel/MyPayments"}>
              <ToLinkIcon />
            </Link>
          </div>
          <div className={`size-30`}>
            <CircularProgressbar
              styles={buildStyles({
                pathColor:
                  userDetail?.data?.profileCompletionPercentage == "100"
                    ? "#008C78"
                    : "#e36209",
                textColor:
                  userDetail?.data?.profileCompletionPercentage == "100"
                    ? "#008C78"
                    : "#e36209",
              })}
              value={
                !isLoading ? userDetail?.data?.profileCompletionPercentage : 0
              }
              text={`${!isLoading ? userDetail?.data?.profileCompletionPercentage : 0}%`}
            />
          </div>
        </div>
      </div>
      <div className={`flex items-center justify-between gap-8`}>
        <div className={`bg-default-light w-5/10`}></div>
        <div className={`bg-default-light w-5/10`}></div>
      </div>
    </div>
  );
};

export default Dashboard;
