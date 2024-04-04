export const SearchResult = ({ result }) => {
  return (
    <div
      className="p-2 hover:bg-gray-200"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};