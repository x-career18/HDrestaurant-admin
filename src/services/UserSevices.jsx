import axios from "axios";

const randomQuery = `?_=${Math.random()}`;
const fetchUserManager = () => {
    return axios.get(`/api/v1/users/manage${randomQuery}`);
};

const fetchUserEmployee = () => {
    return axios.get(`/api/v1/users/employee${randomQuery}`);
};

const fetchUserUpdate = (id, data) => {
    return axios.put(`/api/v1/users/${id}`, data);
};

const fetchUserDelete = (id) => {
    return axios.delete(`/api/v1/users/${id}`);
};
export {
    fetchUserManager,
    fetchUserUpdate,
    fetchUserDelete,
    fetchUserEmployee
};