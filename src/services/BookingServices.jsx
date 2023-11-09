import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

api.interceptors.request.use(
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

const randomQuery = `?_=${Math.random()}`;

const fetchBookings = () => {
  return api.get(`/bookings${randomQuery}`);
};

export { fetchBookings };
