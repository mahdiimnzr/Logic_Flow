import { useState } from "react";
import aiBot from "../../../assets/images/ai4.png";
import AiChatModal from "./AiChatModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/useI18n";

const AiChat = () => {
  const [open, setOpen] = useState(false);
  const { lang, t } = useI18n();
  return (
    <>
      <div
        className={`fixed top-10/11 z-99 ${lang === "en" ? "left-7" : "right-7"}`}
      >
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => setOpen(true)}
              className={`border border-green-primary/20 relative flex items-center justify-center md:size-16 size-14 rounded-full bg-default-light shadow-lg hover:shadow-[0_0_35px_rgba(16,185,129,.35)] hover:scale-110 transition-all duration-300`}
            >
              <div className="absolute inset-0 rounded-full bg-green-primary/10 blur-xl scale-125 opacity-0 transition-all duration-300" />
              <img
                src={aiBot}
                alt="AI"
                className="relative z-10 md:size-10 size-8 object-contain rounded-full transition-all duration-300 "
              />
              <span className="absolute bottom-1 right-1 size-3 rounded-full bg-lightly-green border-2 border-default-light" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("userPanel.tooltip.Assistant")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <AiChatModal onClose={() => setOpen(false)} isOpen={open} />
    </>
  );
};

export default AiChat;
