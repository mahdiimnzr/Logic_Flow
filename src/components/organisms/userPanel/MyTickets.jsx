import { useContext, useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, Eye, X, MessageSquare, Clock } from "lucide-react";
import debounce from "debounce";
import { useQuery } from "@tanstack/react-query";

import ThemeContext from "@/app/context/ThemeContext";
import { useI18n } from "@/i18n/useI18n";
import Button from "@/components/atoms/Buttons/Button";
import Badge from "@/components/atoms/Badge/Badge";
import SelectModal from "@/components/molecules/Select/Select";
import PaginationComponents from "@/components/molecules/Pagination/Pagination";
import { PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import LoadingSvg from "@/core/icons/LoadingSvg";

import CreateTicketModal from "@/components/organisms/userPanel/ticket/CreateTicketModal";
import { getMyTickets } from "@/core/services/api/ticket/ticket.service";
import formatDate from "@/core/utils/formatDate";
import { useTourControl } from "@/components/molecules/TourStep/TourProvider";
import { TourProvider, useTour } from "@reactour/tour";
import { getTourStyles } from "@/components/molecules/TourStep/tourStyles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { rowsOfPages } from "@/core/constants/courseSortings";
import { toast } from "react-toastify";

const filtersItems = [
  { name: "all", title: "همه تیکت‌ها", titleEn: "All" },
  { name: "pending", title: "در حال بررسی", titleEn: "Pending" },
  { name: "closed", title: "بسته شده", titleEn: "Closed" },
];

const MyTickets = () => {
  const { t, lang } = useI18n();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteFiltersShow, setDeleteFiltersShow] = useState(false);

  const [rowPageCount, setRowPageCount] = useState(8);
  const [whichPage, setWhichPage] = useState(1);
  const { openRef } = useTourControl();
  const { setIsOpen, setSteps } = useTour();

  const {
    data: ticketsList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTickets"],
    queryFn: () => getMyTickets(0, 1000),
  });

  const debouncedFn = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
        setWhichPage(1);
      }, 1000),
    [],
  );
  useEffect(() => {
    openRef.current = setIsOpen;
    setSteps([
      {
        selector: '[data-tour="step1"]',
        content: t("userPanel.tickets.step1"),
      },
    ]);
  }, [t]);

  useEffect(() => {
    if ((filter === "all" || filter === null) && inputValue === "") {
      setDeleteFiltersShow(false);
    } else {
      setDeleteFiltersShow(true);
    }
  }, [filter, inputValue]);

  const handleDeleteFilters = () => {
    setInputValue("");
    setDebouncedSearch("");
    setFilter("all");
  };

  const displayData = useMemo(() => {
    if (!ticketsList || !Array.isArray(ticketsList)) return [];

    let filtered = ticketsList;

    if (filter === "closed") {
      filtered = filtered.filter((t) => t.isDone === true);
    } else if (filter === "pending") {
      filtered = filtered.filter((t) => t.isDone === false);
    }

    if (debouncedSearch.trim() !== "") {
      filtered = filtered.filter((t) =>
        t.problem?.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    return filtered;
  }, [debouncedSearch, filter, ticketsList]);

  const pageCount = useMemo(
    () =>
      displayData.length ? Math.ceil(displayData.length / rowPageCount) : 1,
    [displayData.length, rowPageCount],
  );
  const pageArray = useMemo(
    () => Array.from({ length: pageCount }, (_, i) => i + 1),
    [pageCount],
  );
  const visiblePages = useMemo(() => {
    if (pageCount <= 4) {
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
      return pages;
    }

    const pages = [];
    pages.push(1);
    if (whichPage > 3) {
      pages.push("left-ellipsis");
    }
    const start = Math.max(2, whichPage - 1);
    const end = Math.min(pageCount - 1, whichPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (whichPage < pageCount - 2) {
      pages.push("right-ellipsis");
    }
    pages.push(pageCount);

    return pages;
  }, [whichPage, pageCount]);

  const currentPageData = useMemo(() => {
    const start = (whichPage - 1) * rowPageCount;
    return displayData.slice(start, start + rowPageCount);
  }, [displayData, whichPage, rowPageCount]);

  const goToPage = (value) => {
    setWhichPage(value);
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (ticketsList?.success == false) {
      navigate("/UserPanel/Dashboard");
      toast.error(ticketsList?.message);
    }
  }, [isLoading]);
  useEffect(() => {
    if (pageCount < whichPage) {
      setWhichPage(1);
      window.scroll(0, 0);
    }
  }, [pageCount, whichPage]);

  const getStatusBadge = (isDone) => {
    if (isDone) {
      return (
        <Badge className="px-3 py-0.5 text-[12px] bg-light-gray text-field-silver rounded-full">
          {t("userPanel.tickets.closed")}
        </Badge>
      );
    } else {
      return (
        <Badge
          color="panelDecline"
          className="px-3 py-0.5 md:text-[12px] text-[10px]"
        >
          {t("userPanel.tickets.underReview")}
        </Badge>
      );
    }
  };

  if (isLoading) return <LoadingSvg className={`h-full!`} />;

  return (
    <div className={`flex flex-col gap-10 h-full`}>
      <div className={`flex flex-col lg:flex-row justify-between gap-4`}>
        <div className={`flex items-center gap-4 lg:w-6/10 w-full`}>
          <div
            className={`flex-1 flex items-center justify-between h-12 bg-default-light border border-light-gray rounded-[16px] px-4`}
          >
            <input
              className={`w-9/10 outline-none text-field-silver placeholder:text-field-silver text-base font-normal bg-transparent`}
              type="text"
              placeholder={t("userPanel.tickets.searchPlaceHolder")}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                debouncedFn(e.target.value);
              }}
            />
            <Search className={`size-4`} color="#848484" />
          </div>
          {deleteFiltersShow && (
            <Button
              onClick={handleDeleteFilters}
              color="authBtn"
              className={`p-2 flex items-center justify-center gap-1`}
            >
              <X className={`block size-4`} />
            </Button>
          )}
        </div>

        <div className={`flex items-center gap-4`}>
          <div className={`hidden sm:block`}>
            <SelectModal
              items={filtersItems}
              contentPosition={"popper"}
              contentClassName={`min-w-fit! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
              itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
              value={filter}
              triggerClassName={`px-4! text-default-black! font-normal text-base! h-12! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
              setValue={setFilter}
              onValueChange={setFilter}
              placeHolder={t("userPanel.tickets.filters")}
            />
          </div>
          <Button
            color="panelBtn"
            className="flex items-center gap-2 px-5 h-12"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="size-5" />
            <span className="hidden sm:block font-bold">
              {t("userPanel.tickets.newTickets")}
            </span>
          </Button>
        </div>
      </div>

      <div
        data-tour="step1"
        className={`sm:bg-default-light sm:border border-light-gray rounded-[24px] h-full flex flex-col justify-between gap-4 pb-8 pt-4`}
      >
        <div className={`flex flex-col gap-5 sm:hidden px-4`}>
          {currentPageData?.map((ticket, index) => (
            <div
              key={index}
              className={`rounded-[20px] p-4 bg-default-light relative overflow-hidden w-full transition-all border border-light-gray shadow-sm`}
            >
              <div className={`flex flex-col gap-4 text-default-black`}>
                <div className={`flex justify-between items-start`}>
                  <h3 className={`text-base font-bold truncate w-8/12`}>
                    {ticket.problem}
                  </h3>
                  {getStatusBadge(ticket.isDone)}
                </div>
                <div className={`flex items-center gap-1 mt-1`}>
                  <MessageSquare className="size-4 text-field-silver" />
                  <span className={`text-field-silver text-[13px] font-normal`}>
                    {t("userPanel.tickets.menu2")}:{" "}
                    {ticket.ticketTypeId === null
                      ? t("userPanel.tickets.department")
                      : ticket.ticketTypeId}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-between border-t border-light-gray pt-3 mt-1`}
                >
                  <div className={`flex items-center gap-1`}>
                    <Clock className="size-4 text-field-silver" />
                    <span
                      className={`text-field-silver text-[12px] font-normal`}
                    >
                      {ticket.updateDate
                        ? formatDate(ticket.updateDate)
                        : t("userPanel.tickets.unspecified")}
                    </span>
                  </div>
                  <Link to={`/UserPanel/TicketDetail/${ticket.id}`}>
                    <Button color="moreBtn" className="px-4 py-1 text-[12px]">
                      {t("userPanel.tickets.btView")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <table className={`min-w-full sm:table hidden`}>
          <thead className={`h-16`}>
            <tr>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] ${lang === "en" ? "pl-6 text-left" : "pr-6 text-right"} border-b border-light-gray`}
              >
                {t("userPanel.tickets.menu1")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.tickets.menu2")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.tickets.menu3")}
              </th>
              <th
                className={`text-default-black text-center font-semibold xl:text-base text-[14px] border-b border-light-gray`}
              >
                {t("userPanel.tickets.menu4")}
              </th>
              <th
                className={`text-default-black font-semibold xl:text-base text-[14px] ${lang === "en" ? "pr-6 text-right" : "pl-6 text-left"} border-b border-light-gray`}
              >
                {t("userPanel.tickets.menu5")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((ticket, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors">
                <td
                  className={`truncate w-100 max-w-100 border-b border-light-gray py-3.5 text-default-black ${lang === "en" ? "xl:pl-6 pl-3" : "xl:pr-6 pr-3"}`}
                >
                  <span className="truncate w-100 max-w-100 xl:text-base text-[14px] font-bold">
                    {ticket.problem}
                  </span>
                </td>
                <td className="border-b border-light-gray py-3.5 text-center xl:text-base text-[14px] font-normal text-field-silver">
                  {ticket.ticketTypeId === null
                    ? t("userPanel.tickets.department")
                    : ticket.ticketTypeId}
                </td>
                <td className="border-b text-center border-light-gray py-3.5">
                  {getStatusBadge(ticket.isDone)}
                </td>
                <td className="border-b border-light-gray py-3.5 text-center xl:text-base text-[14px] font-normal text-default-black">
                  {ticket.updateDate
                    ? formatDate(ticket.updateDate)
                    : t("userPanel.tickets.unspecified")}
                </td>
                <td
                  className={`border-b w-10 border-light-gray py-3 ${lang === "en" ? "xl:pr-6 pr-3" : "xl:pl-6 pl-3"}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to={`/UserPanel/TicketDetail/${ticket.id}`}>
                          <Eye
                            className="xl:size-5 size-6 cursor-pointer mx-auto"
                            color="#008C78"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {t("userPanel.tooltip.eye")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentPageData.length === 0 && (
          <div className={`flex justify-center items-center py-10`}>
            <span
              className={`text-[14px] font-semibold text-field-silver text-center`}
            >
              {t("userPanel.tickets.notfound")}
            </span>
          </div>
        )}

        <div className={`flex items-center justify-between px-8`}>
          <div className={`w-fit mx-auto sm:mx-0`}>
            <PaginationComponents
              length={pageArray.length}
              titleButtons={true}
              prevOnClick={() => {
                const firstPage = pageArray[0];
                whichPage !== firstPage && goToPage(whichPage - 1);
              }}
              nextOnClick={() => {
                const lastPage = pageArray[pageArray.length - 1];
                whichPage !== lastPage && goToPage(whichPage + 1);
              }}
              itemsClassName="w-fit flex gap-2 items-center cursor-pointer xl:text-base text-[14px]"
            >
              {visiblePages.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <PaginationItem key={item + index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem
                    key={item}
                    isActive={whichPage === item}
                    onClick={() => goToPage(item)}
                    className="cursor-pointer size-7 rounded-full flex items-center justify-center"
                  >
                    {item}
                  </PaginationItem>
                );
              })}
            </PaginationComponents>
          </div>
          <div className={`sm:block hidden`}>
            <SelectModal
              items={rowsOfPages}
              contentPosition={"popper"}
              contentClassName={`min-w-fit! ${theme ? `bg-[#1e1e1e] text-white` : `bg-white text-[#1E1E1E]`}`}
              itemClassName={`${theme ? `focus:bg-[oklch(0.269_0_0)]` : `focus:bg-muted`} h-8! cursor-pointer!`}
              value={undefined}
              triggerClassName={`xl:px-4! px-3! text-default-black! font-normal xl:text-base! text-[14px]! xl:h-12! h-10! rounded-[16px]! cursor-pointer bg-default-light! ring-0! border border-light-gray`}
              setValue={setRowPageCount}
              onValueChange={setRowPageCount}
              placeHolder={t("userPanel.reservedSection.rowsNumber")}
            />
          </div>
        </div>
      </div>

      <CreateTicketModal
        isOpen={createModalOpen}
        setIsOpen={setCreateModalOpen}
        refetch={refetch}
      />
    </div>
  );
};

const MyTicket = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useI18n();
  return (
    <TourProvider key={lang} steps={[]} styles={getTourStyles(theme, lang)}>
      <MyTickets />
    </TourProvider>
  );
};

export default MyTicket;
