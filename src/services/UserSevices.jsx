import axios from './customizeAxios.jsx';

const randomQuery = `?_=${Math.random()}`;
const fetchUserManager = () => {
    return axios.get(`/api/v1/users/manager${randomQuery}`);
};

const fetchNewManager = () => {
    return axios.get(`/api/v1/users/manager?sort=createdAt:desc&limit=10`)
}

const fetchUserEmployee = () => {
    return axios.get(`/api/v1/users/employee${randomQuery}`);
};

const fetchNewEmployee = () => {
    return axios.get(`/api/v1/users/employee?sort=createdAt:desc&limit=10`)
}

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
    fetchUserEmployee,
    fetchNewManager,
    fetchNewEmployee
};