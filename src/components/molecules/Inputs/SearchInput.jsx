import SearchIcon from "../../../core/icons/SearchIcon";

const SearchInput = ({
  onChange,
  name,
  id,
  placeholder,
  className,
  fieldClassName,
}) => {
  return (
    <div
      className={`w-full h-11.5 bg-default-light rounded-[15px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15 px-4 flex items-center gap-2 ${className}`}
    >
      <input
        type="text"
        className={`text-field-silver placeholder:text-field-silver text-base font-normal w-full outline-none ${fieldClassName}`}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchInput;
