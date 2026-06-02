import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

function Pagination({ className, ...props }) {
  return (
    <nav
      dir="ltr"
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, isActive, ...props }) {
  return (
    <li
      className={cn(
        `${className} ${isActive ? `bg-green-primary text-white` : `text-default-black`}`,
      )}
      data-slot="pagination-item"
      {...props}
    />
  );
}

function PaginationLink({ isActive, ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    />
  );
}

function PaginationPrevious({ ...props }) {
  return <ChevronLeftIcon data-icon="inline-start" {...props} />;
}

function PaginationNext({ ...props }) {
  return <ChevronRightIcon data-icon="inline-end" {...props} />;
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
