import { instance as axios } from "./axios";
export const getEmployeesRequest = () => axios.get("/employees");
export const getEmployeeRequest = (dni) => axios.get(`/employee/${dni}`);
export const createEmployeeRequest = (employee) =>
  axios.post("/employee", employee);
export const updateEmployeeRequest = (dni, employee) =>
  axios.put(`/employee/${dni}`, employee);
export const deleteEmployeeRequest = (dni) => axios.delete(`/employee/${dni}`);
