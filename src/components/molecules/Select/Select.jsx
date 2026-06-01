import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/i18n/useI18n";

const SelectModal = ({
  triggerClassName,
  contentClassName,
  itemClassName,
  groupClassName,
  items,
  contentPosition,
  defaultValue,
  value,
  setValue,
}) => {
  const { lang } = useI18n();
  return (
    <Select
      dir={lang === "en" ? "ltr" : "rtl"}
      defaultValue={defaultValue}
      value={value}
      onValueChange={setValue}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position={contentPosition} className={contentClassName}>
        <SelectGroup className={groupClassName}>
          {items?.map((value, index) => (
            <SelectItem
              key={index}
              value={value.name}
              className={itemClassName}
            >
              {lang === "en" ? value?.titleEn : value?.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectModal;
