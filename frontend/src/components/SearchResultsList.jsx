import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="w-full bg-white flex flex-col shadow-md rounded-lg mt-4 max-h-72 overflow-y-auto">
      {results.map((result, id) => {
        return <SearchResult result={result.full_name} key={id} />;
      })}
    </div>
  );
};
