import axios from './customizeAxios.jsx';

const fetchLogin = (data) => {
    return axios.post('/api/v1/auth/login', data);
};

const fetchRegister = (data) => {
    return axios.post('/api/v1/auth/register', data);
};

export {
    fetchLogin,
    fetchRegister,
};