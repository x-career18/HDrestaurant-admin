import axios from './customizeAxios.jsx';

const randomQuery = `?_=${Math.random()}`;

const fetchBookings = () => {
  return axios.get(`/api/v1/bookings${randomQuery}`);
};

const fetchCreateBooking = (data) => {
  return axios.post(`/api/v1/bookings`, data);
};

const updateBooking = (id, data) => {
  return axios.put(`/api/v1/bookings/${id}`, data);
};

const deleteBooking = (id) => {
  return axios.delete(`/api/v1/bookings/${id}`);
};


export {
  fetchBookings,
  fetchCreateBooking,
  updateBooking,
  deleteBooking,
};
