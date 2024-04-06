export const SearchResultsList = ({ className, children }) => {
  return (
    <div
      className={`w-full bg-white dark:bg flex flex-col shadow-md rounded-lg mt-15 p-1 mt-1 overflow-y-auto dark:bg-gray-700 dark:text-white absolute z-10 ${className}`}
    >
      {children}
    </div>
  );
};
