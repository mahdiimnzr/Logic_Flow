import { Pagination, PaginationContent } from "@/components/ui/pagination";

const PaginationComponents = ({ contentClassName, children }) => {
  return (
    <Pagination>
      <PaginationContent className={contentClassName}>
        {children}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponents;
