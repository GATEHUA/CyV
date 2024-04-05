import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ handleChange }) => {
  return (
    <div className="w-full h-10 rounded-lg px-4 shadow-md bg-white dark:bg- flex items-center dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 dark:text-white border">
      <FaSearch className="text-blue-500" />
      <input
        className="bg-transparent border-none h-full w-full ml-2 focus:outline-none dark:placeholder-gray-300"
        placeholder="Escribe para buscar..."
        onChange={handleChange}
      />
    </div>
  );
};
