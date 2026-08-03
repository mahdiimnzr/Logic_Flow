import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useI18n } from "@/i18n/useI18n";

const PaginationComponents = ({
  contentClassName,
  children,
  prevOnClick,
  nextOnClick,
  titleButtons = false,
  itemsClassName = `cursor-pointer sm:size-12.5 size-8 bg-light-gray sm:rounded-[15px] rounded-[10px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`,
  length,
}) => {
  const { lang } = useI18n();
  return (
    <Pagination>
      <PaginationContent className={`flex sm:gap-4 gap-2 ${contentClassName}`}>
        {length != 1 && (
          <PaginationItem onClick={prevOnClick} className={itemsClassName}>
            <PaginationPrevious />
            <p className={`sm:block hidden`}>
              {titleButtons && (lang === "en" ? "Previous" : "قبلی")}
            </p>
          </PaginationItem>
        )}
        {children}
        {length != 1 && (
          <PaginationItem onClick={nextOnClick} className={itemsClassName}>
            <p className={`sm:block hidden`}>
              {titleButtons && (lang === "en" ? "Next" : "بعدی")}
            </p>
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponents;
