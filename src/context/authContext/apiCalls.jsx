import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { jwtDecode } from "jwt-decode";

export const login = async (user, dispatch) => {
  dispatch(loginStart);
  try {
    const res = await axios.post("api/v1/auth/login", user);
    console.log(res.data);
    if (res.data.accessToken) {
      const decodedToken = jwtDecode(res.data.accessToken);
      dispatch(loginSuccess(decodedToken));
      localStorage.setItem("accessToken", res.data.accessToken);
    }
  } catch (error) {
    dispatch(loginFailure);
  }
};
