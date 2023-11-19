import axios from './customizeAxios.jsx';

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

const fetchCreateBooking = (data) => {
  return api.post(`/bookings`, data);
};

const updateBooking = (id, data) => {
  return api.put(`/bookings/${id}`, data);
};

const deleteBooking = (id) => {
  return api.delete(`/bookings/${id}`);
};


export {
  fetchBookings,
  fetchCreateBooking,
  updateBooking,
  deleteBooking,
};
