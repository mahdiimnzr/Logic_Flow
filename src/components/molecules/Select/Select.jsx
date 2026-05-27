import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectModal = ({
  triggerClassName,
  contentClassName,
  itemClassName,
  groupClassName,
  items,
  contentPosition,
  defaultValue,
}) => {
  return (
    <Select dir={"rtl"} defaultValue={defaultValue}>
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
              {value.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectModal;
