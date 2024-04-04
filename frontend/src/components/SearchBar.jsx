import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ handleChange }) => {
  return (
    <div className="w-full h-10 rounded-lg px-4 shadow-md bg-white flex items-center">
      <FaSearch className="text-blue-500" />
      <input
        className="bg-transparent border-none h-full w-full ml-2 focus:outline-none"
        placeholder="Escribe para buscar..."
        onChange={handleChange}
      />
    </div>
  );
};
