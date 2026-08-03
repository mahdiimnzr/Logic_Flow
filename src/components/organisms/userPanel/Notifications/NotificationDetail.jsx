import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Buttons/Button";
import { seenNotification } from "@/core/services/api/userPanel/userPanel.service";
import formatDate from "@/core/utils/formatDate";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const NotificationDetail = ({ isOpen, setIsOpen, props }) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const { message, insertDate, seen, notifId } = props;
  const { mutate: seenMutate } = useMutation({
    mutationFn: (value) =>
      toast.promise(seenNotification(value), {
        pending: t("userPanel.loading"),
        success: {
          render({ data }) {
            return data.data.message;
          },
        },
        error: {
          render({ data }) {
            return data.message;
          },
        },
      }),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["MyNotifications"] });
        setIsOpen(false);
      } else {
        toast.error(response.data.message);
      }
    },
  });
  return (
    <div
      className={`size-full fixed transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"} right-0 top-0 z-100 flex items-center justify-center`}
    >
      <div
        className={`size-full absolute top-0 right-0 bg-black/50 backdrop-blur-[2px]`}
      ></div>
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all sm:p-8 p-4 bg-default-light rounded-[24px] relative xl:w-4/10 sm:w-7/10 w-8/10 max-h-[calc(100vh-64px)] overflow-y-auto no-scrollbar flex flex-col items-center gap-8`}
      >
        <div className={`flex flex-col gap-5 w-full`}>
          <div
            className={`flex flex-col gap-3 justify-between pb-4 border-b border-light-gray`}
          >
            <p className={`text-default-black text-base font-medium`}>
              {t("userPanel.notifications.notificationsText")}
            </p>
            <p className={`text-default-black text-[18px] font-bold`}>
              {message}
            </p>
          </div>
          <div
            className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
          >
            <p className={`text-default-black text-base font-medium`}>
              {t("userPanel.notifications.insertDate")}
            </p>
            <p className={`text-default-black text-[18px] font-bold`}>
              {formatDate(insertDate)}
            </p>
          </div>
          <div
            className={`flex md:flex-row flex-col gap-3 text-center items-center justify-between pb-4 border-b border-light-gray`}
          >
            <p className={`text-default-black text-base font-medium`}>
              {t("userPanel.notifications.seenOrNot")}
            </p>
            <Badge
              color={seen === false ? "panelDecline" : "panelAccept"}
              className={`px-3 py-0.5 xl:text-base! text-[14px]`}
            >
              {seen === false
                ? t("userPanel.notifications.unSeen")
                : t("userPanel.notifications.seen")}
            </Badge>
          </div>
        </div>
        <div className={`w-full flex justify-between`}>
          <Button
            onClick={() => {
              if (seen === false) {
                seenMutate(notifId);
              }
            }}
            color={"panelBtn"}
            className={`sm:px-4 px-3 sm:py-2.5 py-1.5 sm:text-base! text-[14px]!`}
          >
            {seen === false
              ? t("userPanel.notifications.doneSeen")
              : t("userPanel.notifications.seen")}
          </Button>
          <div
            onClick={() => setIsOpen(false)}
            className={`cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver text-base font-normal`}
          >
            {t("userPanel.myCoursesSection.cancel")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
