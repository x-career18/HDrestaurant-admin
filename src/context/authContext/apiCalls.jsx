import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { jwtDecode } from "jwt-decode";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("api/v1/auth/login", user);
    console.log(res.data);
    if (res.data.accessToken) {
      const decodedToken = jwtDecode(res.data.accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
      dispatch(loginSuccess(decodedToken));
      localStorage.setItem("accessToken", res.data.accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
    }
  } catch (error) {
    dispatch(loginFailure())
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message); // Throw the error to be caught later
    } else {
      console.log(error.message);
      throw new Error("An error occurred during login.");
    }
  }
};
