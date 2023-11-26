import axios from './customizeAxios.jsx';

const fetchBills = () => {
    return axios.get('/api/v1/bills');
};

const fetchCreateBills = (data) => {
    return axios.post('/api/v1/bills', data);
};

const fetchGetBookingId = (id) => {
    return axios.get(`/api/v1/bills/booking/${id}`);
};

const fetchUpdateBills = (id, data) => {
    return axios.put(`/api/v1/bills/${id}`, data);
};

const fetchDeleteBills = (id) => {
    return axios.delete(`/api/v1/bills/${id}`);
};

export {
    fetchBills,
    fetchCreateBills,
    fetchUpdateBills,
    fetchDeleteBills,
    fetchGetBookingId,
};
