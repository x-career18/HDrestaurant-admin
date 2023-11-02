import axios from "axios";
import { registerStart, registerSuccess, registerFailure } from "./UserActions";

export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("api/v1/auth/register", user);
    dispatch(registerSuccess(res.data));
    console.log("Created!")
  } catch (error) {
    dispatch(registerFailure());
  }
};
