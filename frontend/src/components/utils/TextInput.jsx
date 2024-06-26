import { forwardRef } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TextInput = forwardRef(
  ({ id = "", type = "text", className = "", message, ...props }, ref) => {
    const colorMessageE = message
      ? `border-red-300 focus:ring-red-500 focus:border-red-500  dark:border-red-500 ${
          type === "date" ? "miInputDate" : ""
        }`
      : `border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500  `;

    return (
      <>
        <div className="w-full relative ">
          <input
            type={type}
            id={id}
            ref={ref}
            className={`bg-gray-50 border-[1.7px] text-gray-900 rounded-lg block w-full dark:bg-gray-700 dark:placeholder-gray-300 dark:text-white ${className} ${colorMessageE}`}
            {...props}
          />

          {message && (
            <div
              data-tooltip-id={id}
              className="absolute inset-y-0 right-0 pl-1 pr-1.5 flex items-center "
            >
              <FiAlertCircle className=" h-4 w-4 text-red-600 dark:text-red-500" />
            </div>
          )}
        </div>
        <ReactTooltip id={id} variant="error" content={message} />
      </>
    );
  }
);

export default TextInput;
