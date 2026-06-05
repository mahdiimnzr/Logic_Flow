import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponents = ({
  contentClassName,
  children,
  prevOnClick,
  nextOnClick,
}) => {
  return (
    <Pagination>
      <PaginationContent className={`flex sm:gap-4 gap-2 ${contentClassName}`}>
        <PaginationItem
          onClick={prevOnClick}
          className={`cursor-pointer sm:size-12.5 size-8 bg-light-gray sm:rounded-[15px] rounded-[10px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`}
        >
          <PaginationPrevious />
        </PaginationItem>
        {children}
        <PaginationItem
          onClick={nextOnClick}
          className={`cursor-pointer sm:size-12.5 size-8 bg-light-gray sm:rounded-[15px] rounded-[10px] shadow-[0px_2px_5px_0px_#000000]/15 flex items-center justify-center sm:text-[18px] text-[14px] font-normal`}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponents;
