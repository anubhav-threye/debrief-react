import { classNames } from "@/utils";

export const Range = ({
  min = 0,
  max = 0,
  value = 0,
  handleChange,
  twClasses,
}) => {
  return (
    <input
      type="range"
      className={classNames("w-full", twClasses)}
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
    />
  );
};
