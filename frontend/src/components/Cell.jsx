import clsx from "clsx";

const Cell = ({
  onClick,
  children,
  color,
  highlightColor,
  isActive = false,
  isClickable = true,
  isBold = false,
}) => {
  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={clsx(
        "h-10 w-10 flex items-center justify-center select-none transition-all rounded-full",
        color ? `border-2 ${color}` : "", // Apply border only if color is present
        {
          "cursor-pointer hover:bg-gray-200": isClickable && !isActive,
          "font-bold": isBold,
          "text-black": highlightColor,
          "text-gray-400": !isClickable,
        }
      )}
      style={{
        backgroundColor: highlightColor || "inherit",
      }}
    >
      {children}
    </div>
  );
};

export default Cell;
