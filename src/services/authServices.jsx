import axios from './customizeAxios.jsx';

const api = axios.create({
    baseURL: '/api/v1',
});

const fetchLogin = (data) => {
    return api.post('/auth/login', data);
};

export {
    fetchLogin,
};