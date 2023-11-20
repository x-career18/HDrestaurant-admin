import axios from './customizeAxios.jsx';

const randomQuery = `?_=${Math.random()}`;

const fetchMenus = () => {
    return axios.get(`/api/v1/menus${randomQuery}`);
};

const fetchCreateMenus = (data) => {
    return axios.post('/api/v1/menus', data);
};

const fetchUpdateMenus = (id, data) => {
    return axios.put(`/api/v1/menus/${id}`, data);
};

const fetchDeleteMenus = (id) => {
    return axios.delete(`/api/v1/menus/${id}`);
};

export {
    fetchMenus,
    fetchCreateMenus,
    fetchUpdateMenus,
    fetchDeleteMenus
};