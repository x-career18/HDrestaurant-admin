import axios from './customizeAxios.jsx';

// const api = axios.create({
//     baseURL: '/api/v1',
// });

// api.interceptors.request.use(
//     (config) => {
//         // Lấy token từ nơi bạn đã lưu nó, ví dụ trong localStorage hoặc biến khác
//         const token = localStorage.getItem('accessToken'); // Điền vào đây để lấy token

//         // Nếu có token, thêm nó vào header
//         if (token) {
//             config.headers.token = token;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

const fetchLogin = (data) => {
    return axios.post('/api/v1/auth/login', data);
};

export {
    fetchLogin,
};