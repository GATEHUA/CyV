import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { HeadTable } from "./HeadTable";
import { headTableEmployees } from "../data/data";

const EmployeesTable = ({
  data,
  handleShowMore,
  handleShowMoreInit,
  itemsToShow,
  handleDelete,
  onShowForm,
}) => {
  return (
    <>
      <div
        className="overflow-auto relative shadow-md sm:rounded-lg"
        style={{ height: "80vh" }}
      >
        <table className=" text-sm text-left w-full text-gray-500 dark:text-gray-400">
          <HeadTable data={headTableEmployees} />
          <tbody>
            {data.slice(0, itemsToShow).map((emp, i) => {
              return (
                <tr
                  key={emp.dni}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {i + 1}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {emp.dni}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {emp.full_name}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center whitespace-pre-line">
                      {emp.position}
                    </div>
                  </td>
                  <td className="px-4 py-4 ">
                    <div className="flex items-center justify-center gap-x-2">
                      <button onClick={() => onShowForm(true, emp)}>
                        <BiEdit
                          size={18}
                          className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(emp.dni)}
                      >
                        <RiDeleteBin2Line
                          size={18}
                          className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-2 md:mt-5 h-5 ">
        {itemsToShow < data.length && (
          <button
            className="pt-1 hover:text-blue-400 border-b-2 border-white hover:border-b-2 hover:border-blue-400 px-2 font-medium text-white whitespace-nowrap dark:text-white"
            onClick={handleShowMore}
          >
            Cargar más Resultados
          </button>
        )}
        {itemsToShow > 35 && (
          <button
            className="pt-1 hover:text-blue-400 border-b-2 border-white hover:border-b-2 hover:border-blue-400 px-2 font-medium text-white whitespace-nowrap dark:text-white"
            onClick={handleShowMoreInit}
          >
            Reiniciar
          </button>
        )}
      </div>
    </>
  );
};

export default EmployeesTable;
