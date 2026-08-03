import OnlineStatusContext from "@/app/context/OnlineStatusContext";
import NoInternetIcon from "@/core/icons/NoInternetIcon";
import { useContext } from "react";

const CONTENT = {
  offline: {
    title: "اتصال اینترنت قطع است",
    subtitle:
      "لطفاً اتصال خود را بررسی کنید، به‌محض وصل شدن صفحه به‌روز می‌شود",
    showIcon: true,
    showRetry: false,
  },
  "server-error": {
    title: "مشکلی در سرور پیش آمده",
    subtitle: "تیم فنی در جریان است، لطفاً کمی بعد دوباره تلاش کنید",
    showIcon: false,
    showRetry: true,
  },
  banned: {
    title: "دسترسی شما محدود شده است",
    subtitle: "حساب شما به دلیل فعالیت غیرمجاز موقتاً مسدود شده است",
    showIcon: false,
    showRetry: false,
  },
};

const OnlineStatusOverlay = () => {
  const { status, clearStatus } = useContext(OnlineStatusContext);

  return (
    status && (
      <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-4 bg-black/70 px-6 text-center">
        {CONTENT[status].showIcon && <NoInternetIcon className="h-100" />}

        <p className="text-base font-medium text-white">
          {CONTENT[status].title}
        </p>
        <p className="max-w-xs text-sm text-white/70">
          {CONTENT[status].subtitle}
        </p>

        {CONTENT[status].showRetry && (
          <button
            onClick={() => {
              clearStatus();
              window.location.reload();
            }}
            className="mt-2 rounded-lg border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            تلاش مجدد
          </button>
        )}
      </div>
    )
  );
};

export default OnlineStatusOverlay;
