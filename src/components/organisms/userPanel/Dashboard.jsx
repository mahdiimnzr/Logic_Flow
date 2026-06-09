import { Skeleton } from "@/components/ui/skeleton";
import ToLinkIcon from "@/core/icons/ToLinkIcon";
import {
  useGetMyCourses,
  useGetMyReserveCourses,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import useGetArticles from "@/core/services/api/hooks/useGetArticles";
import formatDate from "@/core/utils/formatDate";

const Dashboard = () => {
  const { t, lang } = useI18n();
  const { data: userDetail } = useGetUserDetail();
  const { isLoading: articlesLoading, data: articles } = useGetArticles(
    "DashboardArticles",
    { SortingCol: "insertDate", SortType: "desc" },
  );
  const { isLoading: courseLoading, data: courses } = useGetMyCourses(
    "dashboardMyCourses",
    { PageNumber: "1", RowsOfPage: "10" },
  );
  const { isLoading: reserveLoading, data: reservedCourses } =
    useGetMyReserveCourses();
  const courseNotPay = useMemo(() => {
    return (
      courses?.data?.listOfMyCourses?.filter(
        (value) => value.paymentStatus === "پرداخت نشده",
      ) ?? []
    );
  }, [courses]);
  return (
    <div className={`flex flex-col 2xl:gap-8 gap-6`}>
      <div className={`grid xl:grid-cols-3 grid-cols-1 2xl:gap-8 gap-6`}>
        <div
          className={`md:px-6 md:py-4 px-4 py-2 flex flex-col 2xl:gap-4 gap-2 bg-default-light rounded-[20px]`}
        >
          <div className={`flex items-center gap-4`}>
            <span
              className={`2xl:text-[20px] text-[18px] text-default-black font-normal`}
            >
              {t("userPanel.dashboardSection.myCourses")}
            </span>
            <Link to={"/UserPanel/MyCourses"}>
              <ToLinkIcon
                className={
                  lang === "en"
                    ? "transform-[rotate(90deg)]"
                    : "transform-[rotate(0deg)]"
                }
              />
            </Link>
          </div>
          {courseLoading ? (
            <div className={`p-0.5 bg-field-silver rounded-[8px] w-fit`}>
              <Skeleton className={`rounded-[5px] h-5 w-10`} />
            </div>
          ) : (
            <span
              className={`md:text-[48px] text-[40px] font-normal text-green-primary`}
            >
              {courses?.data?.totalCount}
            </span>
          )}
        </div>
        <div
          className={`md:px-6 md:py-4 px-4 py-2 flex flex-col 2xl:gap-4 gap-2 bg-default-light rounded-[20px]`}
        >
          <div className={`flex items-center gap-4`}>
            <span
              className={`2xl:text-[20px] text-[18px] text-default-black font-normal`}
            >
              {t("userPanel.dashboardSection.notPayCourses")}
            </span>
            <Link to={"/UserPanel/MyPayments"}>
              <ToLinkIcon
                className={
                  lang === "en"
                    ? "transform-[rotate(90deg)]"
                    : "transform-[rotate(0deg)]"
                }
              />
            </Link>
          </div>
          {courseLoading ? (
            <div className={`p-0.5 bg-field-silver rounded-[8px] w-fit`}>
              <Skeleton className={`rounded-[5px] h-5 w-10`} />
            </div>
          ) : (
            <span
              className={`md:text-[48px] text-[40px] font-normal text-green-primary`}
            >
              {courseNotPay?.length}
            </span>
          )}
        </div>
        <div
          className={`md:px-6 md:py-4 px-4 py-2 flex md:flex-row flex-col justify-between gap-4 bg-default-light rounded-[20px]`}
        >
          <div className={`flex gap-4`}>
            <span
              className={`2xl:text-[20px] text-[18px] text-default-black font-normal`}
            >
              {t("userPanel.dashboardSection.profileCompleted")}
            </span>
            <Link to={"/UserPanel/MyPayments"}>
              <ToLinkIcon
                className={
                  lang === "en"
                    ? "transform-[rotate(90deg)]"
                    : "transform-[rotate(0deg)]"
                }
              />
            </Link>
          </div>
          <div className={`size-30 sm:self-end self-center h-fit`}>
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
              value={userDetail?.data?.profileCompletionPercentage ?? 0}
              text={`${userDetail?.data?.profileCompletionPercentage ?? 0}%`}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex xl:flex-row flex-col items-center justify-between 2xl:gap-8 gap-6`}
      >
        <div
          className={`bg-default-light xl:w-5/10 w-full rounded-[20px] p-4 flex flex-col 2xl:gap-8 gap-6`}
        >
          <div className={`flex gap-4`}>
            <span
              className={`2xl:text-[20px] text-[18px] text-default-black font-normal`}
            >
              {t("userPanel.dashboardSection.reservedCourses")}
            </span>
            <Link to={"/UserPanel/ReservedCourses"}>
              <ToLinkIcon
                className={
                  lang === "en"
                    ? "transform-[rotate(90deg)]"
                    : "transform-[rotate(0deg)]"
                }
              />
            </Link>
          </div>
          <div className={`flex flex-col 2xl:gap-5 gap-3 items-center`}>
            {!reserveLoading &&
              reservedCourses?.data?.slice(0, 4)?.map((value, index) => (
                <div
                  key={index}
                  className={`p-2 flex gap-4 w-full border border-light-gray rounded-[20px]`}
                >
                  <Link
                    to={`/Courses/Detail/${value.courseId}/Review`}
                    className={`md:w-25 md:min-w-25 min-w-16 w-16 h-16 rounded-[12px]`}
                  >
                    <ImageFallback
                      className={`size-full rounded-[12px]`}
                      src={value.image}
                    />
                  </Link>
                  <div className={`flex flex-col justify-between gap-2 w-8/10`}>
                    <span
                      className={`truncate w-8/10 2xl:text-base md:text-[14px] text-[12px] font-semibold text-default-black`}
                    >
                      {value.courseName}
                    </span>
                    <div className={`flex items-center gap-2`}>
                      <span
                        className={`2xl:text-base text-[14px] font-normal text-default-black`}
                      >
                        {t("userPanel.dashboardSection.status")}
                      </span>
                      <p
                        className={`${value.accept ? `text-green-primary` : `text-red-danger`} font-normal 2xl:text-base text-[14px]`}
                      >
                        {value.accept
                          ? t("userPanel.dashboardSection.reservedDone")
                          : t("userPanel.dashboardSection.unReserved")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {reservedCourses?.data?.length == 0 && (
              <span className={`text-[14px] font-semibold text-default-black`}>
                {t("userPanel.dashboardSection.notFound")}
              </span>
            )}
            {reservedCourses?.data?.length >= 4 && (
              <Link
                to={"/UserPanel/ReservedCourses"}
                className={`md:text-base text-[14px] font-normal text-field-silver`}
              >
                {t("userPanel.dashboardSection.showAll")}
              </Link>
            )}
          </div>
        </div>
        <div
          className={`bg-default-light xl:w-5/10 w-full rounded-[20px] p-4 flex flex-col 2xl:gap-8 gap-6`}
        >
          <div className={`flex gap-4`}>
            <span
              className={`2xl:text-[20px] text-[18px] text-default-black font-normal`}
            >
              {t("userPanel.dashboardSection.newArticles")}
            </span>
            <Link to={"/UserPanel/ReservedCourses"}>
              <ToLinkIcon
                className={
                  lang === "en"
                    ? "transform-[rotate(90deg)]"
                    : "transform-[rotate(0deg)]"
                }
              />
            </Link>
          </div>
          <div className={`flex flex-col 2xl:gap-5 gap-3 items-center`}>
            {!articlesLoading &&
              articles?.data?.news?.slice(0, 4)?.map((value, index) => (
                <div
                  key={index}
                  className={`p-2 flex gap-4 w-full border border-light-gray rounded-[20px]`}
                >
                  <Link
                    to={`/Articles/Detail/${value.id}/Review`}
                    className={`md:w-25 md:min-w-25 min-w-16 w-16 h-16 rounded-[12px]`}
                  >
                    <ImageFallback
                      className={`size-full rounded-[12px]`}
                      src={value.currentImageAddress}
                    />
                  </Link>
                  <div className={`flex flex-col justify-between gap-2 w-8/10`}>
                    <span
                      className={`truncate w-8/10 2xl:text-base md:text-[14px] text-[12px] font-semibold text-default-black`}
                    >
                      {value.title}
                    </span>
                    <span
                      className={`text-[14px] font-normal text-field-silver`}
                    >
                      {formatDate(value.insertDate)}
                    </span>
                  </div>
                </div>
              ))}
            {articles?.data?.news?.length == 0 && (
              <span className={`text-[14px] font-semibold text-default-black`}>
                {t("userPanel.dashboardSection.notFound")}
              </span>
            )}
            {articles?.data?.news?.length >= 4 && (
              <Link
                to={"/Articles"}
                className={`md:text-base text-[14px] font-normal text-field-silver`}
              >
                {t("userPanel.dashboardSection.showAll")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
