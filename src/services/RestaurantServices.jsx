import axios from 'axios';

const fetchRestaurants = () => {
    return axios.get('/api/v1/restaurants');
}

const fetchRestaurantById = (id) => {
    return axios.get(`/api/v1/restaurants/${id}`);
};

const fetchRestaurantAll = () => {
    return axios.get('/api/v1/restaurants/all');
};

const fetchUpdateRestaurant = (id, data) => {
    return axios.put(`/api/v1/restaurants/${id}`, data);
};

const fetchDeleteRestaurant = (id) => {
    return axios.delete(`/api/v1/restaurants/${id}`);
};

export {
    fetchRestaurants,
    fetchRestaurantById,
    fetchRestaurantAll,
    fetchUpdateRestaurant,
    fetchDeleteRestaurant,
}