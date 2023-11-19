import axios from "axios";

const instance = axios.create({
    baseURL: "https://hd-restaurant-be.onrender.com",
});


export default instance;