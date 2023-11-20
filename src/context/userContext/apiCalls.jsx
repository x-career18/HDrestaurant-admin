import axios from "axios";
import { registerStart, registerSuccess, registerFailure } from "./UserActions";
import { fetchRegister } from "../../services/authServices";

export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await fetchRegister(user);
    dispatch(registerSuccess(res.data));
    console.log("Created!")
  } catch (error) {
    dispatch(registerFailure());
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message); // Throw the error to be caught later
    } else {
      console.log(error.message);
      throw new Error("An error occurred during login.");
    }
  }
};
