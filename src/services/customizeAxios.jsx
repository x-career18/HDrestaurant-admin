import axios from "axios";

const instance = axios.create({
    baseURL: "https://hd-restaurant-be.onrender.com",
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default instance;