import Button from "@/components/atoms/Buttons/Button";
import LoadingSvg from "@/core/icons/LoadingSvg";
import { seenNotification } from "@/core/services/api/userPanel/userPanel.service";
import formatDate from "@/core/utils/formatDate";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Bell, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NotificationModal = ({ isOpen, setIsOpen, data, isLoading }) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({ queryKey: ["NotSeenNotifications"] });
      } else {
        toast.error(response.data.message);
      }
    },
  });

  return (
    <div
      className={`${isOpen ? "visible opacity-100" : "invisible opacity-0"} transition-all fixed top-0 right-0 h-screen inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-[2px]`}
    >
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all w-9/10 max-w-lg rounded-3xl bg-default-light shadow-2xl overflow-hidden`}
      >
        <div className="flex items-center justify-between border-b border-light-gray px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Bell className="text-green-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-default-black">
                {" "}
                {t("landing.NotificationModal.notifications")}
              </h2>
              <p className="text-xs text-field-silver">
                {data?.length} {t("landing.NotificationModal.newNotifications")}
              </p>
            </div>
          </div>
          <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>
        {isLoading ? (
          <LoadingSvg className={`h-full!`} />
        ) : (
          <div className="max-h-105 overflow-y-auto p-5 flex flex-col gap-3">
            {(data ?? []).length > 0 ? (
              (data ?? [])?.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-2xl border border-light-gray p-4 hover:border-green-primary hover:bg-emerald-500/5 transition-all"
                >
                  <p className="text-default-black font-medium max-w-10/10 truncate">
                    {value.message}
                  </p>
                  <span className="text-xs text-field-silver">
                    {formatDate(value.insertDate)}
                  </span>
                  <Button
                    onClick={() => {
                      seenMutate(value.id);
                    }}
                    color={"panelBtn"}
                    className={`sm:px-3 px-2 sm:py-1.5 py-0.5 sm:text-[14px]! text-[12px]! w-fit!`}
                  >
                    {t("landing.NotificationModal.confirm")}
                  </Button>
                </div>
              ))
            ) : (
              <span
                className={`text-[14px] font-semibold text-default-black text-center`}
              >
                {t("landing.NotificationModal.notFound")}
              </span>
            )}
          </div>
        )}
        <div className="border-t border-light-gray p-5 flex justify-between">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <Link
              dir="rtl"
              to={`/UserPanel/Notifications`}
              className="flex items-center gap-2 rounded-xl bg-green-primary hover:bg-green-primary/90 text-[13px] px-4 py-2 text-default-light"
            >
              <span>{t("landing.NotificationModal.notificationsPage")}</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
