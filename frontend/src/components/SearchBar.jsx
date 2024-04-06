import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ handleChange }) => {
  return (
    // <div className="w-full relative h-10 rounded-lg px-4 shadow-md bg-white dark:bg- flex items-center dark:bg-gray-700 border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-500 dark:text-white border">
    //   <FaSearch className="text-blue-500" />
    //   <input
    //     className="bg-transparent  h-full w-full ml-2 dark:placeholder-gray-300"
    //     placeholder="Escribe para buscar..."
    //     onChange={handleChange}
    //   />
    // </div>
    <div className="w-full relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
        <FaSearch className="text-blue-500 dark:text-gray-400" />
      </div>

      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 dark:placeholder-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Escribe para buscar..."
        onChange={handleChange}
      />
    </div>
  );
};
