export const SearchResult = ({ result, handleOnClick }) => {
  return (
    <div
      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
      onClick={() => handleOnClick(result)}
    >
      <div className="text-base font-semibold">{result.full_name}</div>
      <div className="font-normal text-sm text-gray-400">{result.dni}</div>
      <div className="font-normal text-xs text-gray-400">{result.position}</div>
    </div>
  );
};
