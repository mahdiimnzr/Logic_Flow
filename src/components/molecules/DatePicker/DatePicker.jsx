import { CalendarIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarHijri } from "@/components/ui/CalendarHijri";
import { useContext, useState } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import formatDate from "@/core/utils/formatDate";

const DatePickerInput = ({
  date,
  label,
  onChange,
  month,
  setMonth,
  className = "flex justify-between",
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <Field className="mx-auto">
      {label && (
        <FieldLabel
          className={`text-base! font-normal! text-default-black!`}
          htmlFor="date-picker"
        >
          {label}
        </FieldLabel>
      )}
      <InputGroup className={className}>
        <span
          className={`font-normal text-field-silver sm:text-base! text-[14px]!`}
        >
          {date ? formatDate(date) : "mm / dd / yyyy"}
        </span>
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon color={!theme ? "#1E1E1E" : "#FFFFFF"} />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0 z-9999"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <CalendarHijri
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(d) => {
                  onChange(d);
                  setOpen(false);
                }}
                dir="rtl"
                {...rest}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};

export default DatePickerInput;
