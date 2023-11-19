import axios from './customizeAxios.jsx';

const api = axios.create({
    baseURL: '/api/v1',
});

api.interceptors.request.use(
    (config) => {
        // Lấy token từ nơi bạn đã lưu nó, ví dụ trong localStorage hoặc biến khác
        const token = localStorage.getItem('accessToken'); // Điền vào đây để lấy token

        // Nếu có token, thêm nó vào header
        if (token) {
            config.headers.token = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const randomQuery = `?_=${Math.random()}`;
const fetchUserManager = () => {
    return api.get(`/users/manage${randomQuery}`);
};

const fetchNewManager = () => {
    return axios.get(`/api/v1/users/manage?sort=createdAt:desc&limit=10`)
}

const fetchUserEmployee = () => {
    return api.get(`/users/employee${randomQuery}`);
};

const fetchNewEmployee = () => {
    return axios.get(`/api/v1/users/employee?sort=createdAt:desc&limit=10`)
}

const fetchUserUpdate = (id, data) => {
    return api.put(`/users/${id}`, data);
};

const fetchUserDelete = (id) => {
    return api.delete(`/users/${id}`);
};
export {
    fetchUserManager,
    fetchUserUpdate,
    fetchUserDelete,
    fetchUserEmployee,
    fetchNewManager,
    fetchNewEmployee
};