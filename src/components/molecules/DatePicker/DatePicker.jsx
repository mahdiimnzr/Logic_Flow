import { CalendarIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarHijri } from "@/components/ui/CalendarHijri";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";

function isValidDate(date) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}
const DatePickerInput = ({
  date,
  setDate,
  label,
  onChange,
  value,
  setValue,
  month,
  setMonth,
  open,
  setOpen,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Field className="mx-auto">
      <FieldLabel
        className={`text-base! font-normal! text-default-black!`}
        htmlFor="date-required"
      >
        {label}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={value}
          placeholder="yyyy/mm/dd"
          onChange={(e) => {
            const value = e.target.value;

            setValue(value);

            if (!value) {
              setDate(undefined);
              return;
            }

            const date = new Date(value);

            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
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
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <CalendarHijri
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={onChange}
                dir="rtl"
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};

export default DatePickerInput;
