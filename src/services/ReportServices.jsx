import axios from "./customizeAxios.jsx";

const randomQuery = `?_=${Math.random()}`;

const getReports = () => {
  return axios.get(`/api/v1/reports${randomQuery}`);
};

const createReport = (report) => {
  return axios.post(`/api/v1/reports`, report);
};

const updateReport = (id, data) => {
  return axios.put(`/api/v1/reports/${id}`, data);
};

const deleteReport = (id) => {
  return axios.delete(`/api/v1/reports/${id}`);
};

export { getReports, createReport, updateReport, deleteReport };
