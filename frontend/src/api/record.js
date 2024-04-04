import { instance as axios } from "./axios";

export const getRecordsRequest = () => axios.get(`/records`);
export const getLeakedRecordsRequest = (start_time, end_time) =>
  axios.get(`/leaked_records?start_time=${start_time}&end_time=${end_time}`);
export const createRecordRequest = (record) => axios.post("/record", record);
export const deleteRecordRequest = (id) => axios.delete(`/record/${id}`);
