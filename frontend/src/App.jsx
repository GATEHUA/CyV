import { useEffect, useRef, useState } from "react";
import { getEmployeesRequest } from "./api/employee";

import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

export default function App() {
  const employees = useRef([]);
  const [results, setResults] = useState([]);

  const [results2, setResults2] = useState([]);

  // const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});

  // const searchFunctionVal = (data, search) =>
  //   data.find((item) => search === item.dni);

  // const handleChangueDni = (e) => {
  //   if (e.target.value.length === 8) {
  //     const emp = searchFunctionVal(employees, e.target.value);
  //     setEmployee(emp);
  //   }
  // };

  // const searchFunctionVal = (data, dni, full_name) =>
  //   data.find((item) => item.dni === dni || item.full_name === full_name);

  // const handleChangueDni = (e) => {
  //   if (e.target.value.length >= 3) {
  //     // Cambié la longitud a 3 para permitir la búsqueda por apellido
  //     const emp = searchFunctionVal(employees, e.target.value, e.target.value);
  //     setEmployee(emp);
  //   }
  // };

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange2 = (e) => {
    const results = employees.current.filter((emp) => {
      // const allData = Object.values(emp);
      const dniandfull_nameData = [emp.full_name, emp.dni, emp.position];
      return dniandfull_nameData.some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      );
      // return (
      //   e.target.value &&
      //   emp.full_name &&
      //   emp.full_name.toLowerCase().includes(e.target.value)
      // );
    });
    if (e.target.value) {
      setResults2(results);
    } else {
      setResults([]);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await getEmployeesRequest();
      const full_employee = data.map((emp) => ({
        ...emp,
        full_name: `${emp.surname} ${emp.second_surname}, ${emp.names}`,
      }));
      employees.current = full_employee;
    } catch (error) {
      console.log(error);
    }
  };

  console.log(results2);
  const handleChange = (e) => {
    fetchData(e.target.value);
  };
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="bg-slate-200 dark:bg-slate-800 h-full min-h-screen font-Poppins">
      {employees.current.length > 0 ? <div>Hay</div> : <div>No hay</div>}
      <div className="bg-white">
        <div className="pb-[10vh] pt-[10vh] m-auto w-[70%] flex items-center justify-center flex-col">
          <SearchBar handleChange={handleChange} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} />
          )}
        </div>
      </div>

      <div className="bg-gray-200">
        <div className="pb-[10vh] pt-[10vh] m-auto w-[70%] flex items-center justify-center flex-col">
          <SearchBar handleChange={handleChange2} />
          {results2 && results2.length > 0 && (
            <SearchResultsList results={results2} />
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="">
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            N° de DNI (*)
          </label>
          <input
            id="dni"
            className="w-full"
            type="text"
            placeholder="N° de DNI"
            defaultValue={employee?.dni}
          />
        </div>
        <div className="">
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            Apellidos y Nombres (*)
          </label>
          <input
            type="text"
            placeholder="Apellidos y Nombres"
            defaultValue={employee?.full_name}
          />
        </div>
        <div className="">
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            Puesto (*)
          </label>
          <input
            type="text"
            placeholder="Puesto"
            defaultValue={employee?.position}
          />
        </div>
      </div>
    </div>
  );
}
