import { Checkbox } from "radix-ui";
import { useState } from "react";

const CheckBox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={`flex items-center`}>
      <Checkbox.Root
        name="c1"
        id="c1"
        checked={checked}
        onCheckedChange={setChecked}
      >
        <div
          className={`size-6.5 rounded-[10px] ${!checked ? `border border-[#A6A6A6] bg-default-light` : `bg-green-primary`}`}
        >
          {checked && <CheckIcon />}
        </div>
      </Checkbox.Root>
      <label className="Label" htmlFor="c1">
        Accept terms and conditions.
      </label>
    </div>
  );
};

const CheckIcon = () => {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7071 0.292923C14.0976 0.683487 14.0976 1.31776 13.7071 1.70833L5.70796 9.70708C5.31738 10.0976 4.68307 10.0976 4.29249 9.70708L0.292936 5.7077C-0.0976453 5.31714 -0.0976453 4.68286 0.292936 4.2923C0.683517 3.90173 1.31782 3.90173 1.7084 4.2923L5.00179 7.58241L12.2947 0.292923C12.6853 -0.097641 13.3196 -0.097641 13.7102 0.292923H13.7071Z"
        fill="white"
      />
    </svg>
  );
};

export default CheckBox;
