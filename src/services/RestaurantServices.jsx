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

const fetchRestaurants = () => {
    return api.get(`/restaurants${randomQuery}`);
}

const fetchRestaurantById = (id) => {
    return api.get(`/restaurants/${id}`);
};

const fetchRestaurantAll = () => {
    return api.get('/restaurants/all');
};

const fetchUpdateRestaurant = (id, data) => {
    return api.put(`/restaurants/${id}`, data);
};

const fetchDeleteRestaurant = (id) => {
    return api.delete(`/restaurants/${id}`);
};

export {
    fetchRestaurants,
    fetchRestaurantById,
    fetchRestaurantAll,
    fetchUpdateRestaurant,
    fetchDeleteRestaurant
}