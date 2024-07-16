import { classNames } from "@/utils";

export const Button = ({ label, icon, twClasses, handleClick, children }) => {
  return (
    <button
      className={classNames("px-4 h-8 w-32 rounded-lg", twClasses)}
      onClick={handleClick}
    >
      {label && <span>{label}</span>}
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
