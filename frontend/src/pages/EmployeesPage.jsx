import { useEffect, useRef, useState } from "react";
import { getEmployeesRequest } from "../api/employee";
import { HeaderPageTable } from "../components/HeaderPageTable";
import { Modal } from "../components/utils/Modal";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import TextInput from "../components/utils/TextInput";
import Button from "../components/utils/Button";
import Label from "../components/utils/Label";
import { positions } from "../data/data";

import { AiFillSave } from "react-icons/ai";
import { SearchResultsList } from "../components/SearchResultsList";
import { SearchResultSimp } from "../components/SearchResult";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [statePositions, setStatePositions] = useState([]);
  const [showFormEmploye, setShowFormEmploye] = useState(false);

  const getEmployees = async () => {
    try {
      const { data } = await getEmployeesRequest();
      const full_employee = data.map((emp) => ({
        ...emp,
        full_name: `${emp.surname} ${emp.second_surname}, ${emp.names}`,
      }));
      setEmployees(full_employee);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
  console.log(employees);

  function handleChangue(e) {}

  const onShowEmployeeForm = (value, data, id) => {
    setShowFormEmploye(value);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    toast.success("Registrado correctamente");
  });

  return (
    <>
      <div className="p-4 w-full bg-slate-200 dark:bg-slate-800 h-full min-h-screen font-Poppins">
        <HeaderPageTable
          onShowForm={onShowEmployeeForm}
          handleChangue={handleChangue}
        />
      </div>
      <div
        className={`h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 fixed ${
          showFormEmploye ? "grid" : "hidden"
        } place-items-center p-2 `}
      >
        <Modal
          onShowForm={onShowEmployeeForm}
          titleModal={"Crear Empleado"}
          className={" max-w-2xl "}
        >
          <form
            onSubmit={onSubmit}
            className="flex flex-col space-y-5 md:space-y-7 m-auto"
          >
            <div className="">
              <Label htmlFor="dni">N° de DNI (*):</Label>
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
              <Label htmlFor="surname">Apellido Paterno (*):</Label>
              <TextInput
                {...register("surname", {
                  required: { value: true, message: "El campo es obligatorio" },
                })}
                id="surname"
                message={errors.surname?.message}
                className="p-2"
                placeholder="Apellido Paterno"
              />
            </div>
            <div className="">
              <Label htmlFor="second_surname">Apellido Materno (*):</Label>
              <TextInput
                {...register("second_surname", {
                  required: { value: true, message: "El campo es obligatorio" },
                })}
                id="second_surname"
                message={errors.second_surname?.message}
                className="p-2"
                placeholder="Apellido Materno"
              />
            </div>
            <div className="">
              <Label htmlFor="names">Nombres (*):</Label>
              <TextInput
                {...register("names", {
                  required: { value: true, message: "El campo es obligatorio" },
                })}
                id="names"
                message={errors.names?.message}
                className="p-2"
                placeholder="Nombres"
              />
            </div>
            <div className="relative">
              <Label htmlFor="names">Puesto (*):</Label>
              <TextInput
                // list="positions"
                className="p-2"
                {...register("position", {
                  required: { value: true, message: "El campo es obligatorio" },
                })}
                onChange={(e) => {
                  const results = positions.filter((value) => {
                    return (
                      value &&
                      value
                        .toString()
                        .toLowerCase()
                        .startsWith(e.target.value.toLowerCase())
                    );
                  });
                  if (e.target.value) {
                    setStatePositions(results.slice(0, 2));
                  } else {
                    setStatePositions([]);
                  }
                }}
                id="position"
                message={errors.position?.message}
                type="text"
                placeholder="Puesto"
              />
              {statePositions.length > 0 && (
                <SearchResultsList>
                  {statePositions.map((p) => (
                    <SearchResultSimp result={p} />
                  ))}
                </SearchResultsList>
              )}
              {/* <datalist id="positions">
                {positions.map((p) => (
                  <option value={p} />
                ))}
              </datalist> */}
            </div>
            <Button
              type="submit"
              className="text-lg px-5 py-1.5 font-medium bg-blue-600 my-4 hover:bg-blue-700 focus:ring-blue-400 flex items-center  justify-center gap-x-2"
            >
              <AiFillSave />
              Registrar
            </Button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default EmployeesPage;