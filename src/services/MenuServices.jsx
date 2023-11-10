import axios from 'axios';

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

const fetchMenus = () => {
    return api.get(`/menus${randomQuery}`);
};

const fetchCreateMenus = (data) => {
    return api.post('/menus', data);
};

const fetchUpdateMenus = (id, data) => {
    return api.put(`/menus/${id}`, data);
};

const fetchDeleteMenus = (id) => {
    return api.delete(`/menus/${id}`);
};

export {
    fetchMenus,
    fetchCreateMenus,
    fetchUpdateMenus,
    fetchDeleteMenus
};