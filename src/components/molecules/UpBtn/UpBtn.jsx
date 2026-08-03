import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/useI18n";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const UpBtn = () => {
  const { lang, changeLang, t } = useI18n();
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      dir={lang === "en" ? "ltr" : "rtl"}
      className={`fixed flex flex-col items-center gap-3 ${lang === "en" ? "left-6" : "right-6"} top-7/10 z-50`}
    >
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`w-12 h-12 rounded-2xl bg-green-primary hover:bg-green-primary/90 border border-green-primary/30 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 ${showScrollBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
      >
        <ChevronUp className="size-7 text-white" />
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() =>
              lang === "en" ? changeLang("fa") : changeLang("en")
            }
            className="w-12 h-12 rounded-2xl bg-green-primary hover:bg-green-primary/90 border border-green-primary/30 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 text-white font-bold text-lg tracking-widest"
          >
            {lang === "en" ? "EN" : "FA"}
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{t("userPanel.tooltip.language")}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default UpBtn;
