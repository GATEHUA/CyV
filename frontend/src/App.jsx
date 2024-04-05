import { useEffect, useRef, useState } from "react";
import { getEmployeesRequest } from "./api/employee";
import { useForm } from "react-hook-form";
import { AiFillSave } from "react-icons/ai";

import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Label from "./components/utils/Label";
import Button from "./components/utils/Button";
import TextInput from "./components/utils/TextInput";

export default function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const employees = useRef([]);
  const [results, setResults] = useState([]);

  const handleOnClick = (emp) => {
    setResults([]);
    setValue("dni", emp.dni);
    setValue("full_name", emp.full_name);
    setValue("position", emp.position);
  };

  const handleChange = (e) => {
    const results = employees.current.filter((emp) => {
      const dniandfull_nameData = [emp.full_name, emp.dni, emp.position];
      return dniandfull_nameData.some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    if (e.target.value) {
      setResults(results);
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

  useEffect(() => {
    getEmployees();
  }, []);

  console.log(errors);

  const onSubmit = handleSubmit((values) => {
    console.log("values");

    console.log(values);
  });
  return (
    <div className="bg-slate-200 dark:bg-slate-800 h-full min-h-screen font-Poppins">
      <div className="pb-[10vh] pt-[10vh] m-auto w-[80%] flex items-center justify-center flex-col">
        <SearchBar handleChange={handleChange} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} handleOnClick={handleOnClick} />
        )}
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col space-y-5 w-[80%] m-auto"
      >
        <div className="">
          <TextInput
            {...register("dni", {
              required: { value: true, message: "El campo es obligatorio" },
            })}
            message={errors.dni?.message}
            id="dni"
            className="p-2"
            placeholder="N° de DNI"
          />
        </div>
        <div className="">
          <TextInput
            {...register("full_name", {
              required: { value: true, message: "El campo es obligatorio" },
            })}
            id="full_name"
            message={errors.full_name?.message}
            className="p-2"
            placeholder="Apellidos y Nombres"
          />
        </div>
        <div className="">
          <TextInput
            className="p-2"
            {...register("position", {
              required: { value: true, message: "El campo es obligatorio" },
            })}
            id="position"
            message={errors.position?.message}
            type="text"
            placeholder="Puesto"
          />
        </div>

        <Button
          type="submit"
          className="text-lg px-5 py-1.5 font-medium bg-blue-600 my-4 hover:bg-blue-700 focus:ring-blue-400 flex items-center  justify-center gap-x-2"
        >
          <AiFillSave />
          Registrar
        </Button>
      </form>
    </div>
  );
}
