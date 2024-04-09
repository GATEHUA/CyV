import { useEffect, useRef, useState, useMemo } from "react";
import { getEmployeesRequest } from "../api/employee";
import { useForm } from "react-hook-form";
import { AiFillSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";
import Button from "../components/utils/Button";
import TextInput from "../components/utils/TextInput";
import { toast } from "sonner";
import { SearchResult } from "../components/SearchResult";
import Reloj from "../components/Reloj";
import { createRecordRequest } from "../api/record";

const MainPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
      //   const dniandfull_nameData = [emp.full_name, emp.dni, emp.position];
      const allData = Object.values(emp);
      return allData.some(
        (value) =>
          value &&
          value
            .toString()
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase())
      );
    });
    if (e.target.value) {
      setResults(results.slice(0, 3));
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

  const onSubmit = handleSubmit((values) => {
    const currentTime = new Date().toISOString();
    toast.promise(
      createRecordRequest({
        employee_dni: values.dni,
        created_at: currentTime,
      }),
      {
        className: "dark:bg-gray-700 dark:text-white",
        loading: "Cargando...",
        success: () => {
          reset();
          return <div>Registrado Correctamente</div>;
        },
        error: (error) => {
          return <div>{error.response.data}</div>;
        },
      }
    );
  });

  return (
    <div className="bg-slate-200 dark:bg-slate-800 h-full min-h-screen font-Poppins">
      <div className="pt-14 md:pt-20 h-screen">
        <div className="w-[80%] m-auto space-y-5">
          <h1 className="dark:text-white text-gray-900 text-center text-2xl md:text-3xl font-semibold">
            Registro para la Participación en el Protocolo de Chispeo y Voladura
          </h1>
          {/* <div className="dark:text-white text-gray-900 text-center text-5xl font-bold"> */}
          <Reloj />
          {/* </div> */}
          {/* <img
            src="./images/logo_white.png"
            className="m-auto w-[13rem] md:w-72"
            alt=""
          /> */}
        </div>

        <div className="md:py-12 py-6 m-auto w-[80%] flex items-center justify-center flex-col ">
          <div className="relative w-full">
            <SearchBar handleChange={handleChange} />
            {results && results.length > 0 && (
              <SearchResultsList
                results={results}
                handleOnClick={handleOnClick}
              >
                {results.map((result) => (
                  <SearchResult
                    result={result}
                    handleOnClick={handleOnClick}
                    key={result.dni}
                  />
                ))}
              </SearchResultsList>
            )}
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col space-y-4 md:space-y-7 w-[80%] m-auto"
        >
          <div className="">
            <TextInput
              {...register("dni", {
                required: { value: true, message: "El campo es obligatorio" },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "El campo sólo debe contener números",
                },
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
    </div>
  );
};

export default MainPage;
