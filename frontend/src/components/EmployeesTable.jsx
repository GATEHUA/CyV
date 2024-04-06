import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { HeadTable } from "./HeadTable";
import { headTableEmployees } from "../data/data";

const EmployeesTable = ({
  data,
  handleShowMore,
  handleShowMoreInit,
  itemsToShow,
}) => {
  return (
    <div
      className="overflow-auto relative shadow-md sm:rounded-lg"
      style={{ height: "85vh" }}
    >
      <table className=" text-sm text-left w-full text-gray-500 dark:text-gray-400">
        <HeadTable data={headTableEmployees} />
        <tbody>
          {data.map((emp) => {
            return (
              <tr
                key={emp.dni}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-4 ">
                  <div className="flex items-center justify-center gap-x-2">
                    <button
                    // onClick={() => onShowFormQuestion(true, question)}
                    >
                      <BiEdit
                        size={18}
                        className="dark:text-white cursor-pointer dark:hover:text-blue-500 hover:text-blue-500"
                      />
                    </button>
                    <button
                      type="button"
                      // onClick={() => handleDeleteQuestion(question._id)}
                    >
                      <RiDeleteBin2Line
                        size={18}
                        className="dark:text-white cursor-pointer dark:hover:text-red-500 hover:text-red-500"
                      />
                    </button>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
