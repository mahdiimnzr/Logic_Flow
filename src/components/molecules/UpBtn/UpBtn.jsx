import Border from "@/components/atoms/Border/Border";
import { useI18n } from "@/i18n/useI18n";
import { ChevronsUp } from "lucide-react";
import { useEffect, useRef } from "react";

const UpBtn = () => {
  const upBtnRef = useRef(null);
  const { lang, changeLang } = useI18n();
  useEffect(() => {
    document.onscroll = () => {
      if (window.pageYOffset > 300) {
        upBtnRef.current.style.height = "40px";
        upBtnRef.current.style.opacity = "100";
        upBtnRef.current.style.transform = "rotate(0deg)";
      } else {
        upBtnRef.current.style.height = "0px";
        upBtnRef.current.style.opacity = "0";
        upBtnRef.current.style.transform = "rotate(180deg)";
      }
    };
  });
  return (
    <div
      className={`fixed flex flex-col items-center gap-2 ${lang === "fa" ? `left-5` : `right-5`} top-7/10 z-50 bg-green-primary py-1 px-2 rounded shadow-[0px_4px_4px_0px_#000000]/15`}
    >
      <div
        ref={upBtnRef}
        onClick={() => scroll(0, 0)}
        className={`rounded-full border border-white w-10 h-0 opacity-0 mx-auto cursor-pointer content-center transition-all transform-[rotate(180deg)]`}
      >
        <ChevronsUp className={`mx-auto size-6`} color="white" />
      </div>
      <div
        className={`flex items-center md:gap-2 gap-1 text-white md:text-base text-[12px]`}
      >
        <span
          onClick={() => changeLang("en")}
          className={`cursor-pointer size-8 rounded-full content-center text-center leading-8 ${lang === "en" ? "font-bold border border-white" : "font-normal"}`}
        >
          EN
        </span>
        <Border width="w-0.5" height="h-4" color="bg-white" />
        <span
          onClick={() => changeLang("fa")}
          className={`cursor-pointer size-8 rounded-full content-center text-center leading-8 ${lang === "fa" ? "font-bold border border-white" : "font-normal"}`}
        >
          FA
        </span>
      </div>
    </div>
  );
};

export default UpBtn;
