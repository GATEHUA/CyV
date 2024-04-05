import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, handleOnClick }) => {
  return (
    <div className="w-full bg-white dark:bg flex flex-col shadow-md rounded-lg mt-1 p-1 max-h-72 overflow-y-auto dark:bg-gray-700 dark:text-white">
      {results.map((result) => {
        return (
          <SearchResult
            result={result}
            key={result.dni}
            handleOnClick={handleOnClick}
          />
        );
      })}
    </div>
  );
};
