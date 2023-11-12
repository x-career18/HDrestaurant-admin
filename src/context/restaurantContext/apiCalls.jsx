import axios from "axios";
import {
  createRestaurantStart,
  createRestaurantSuccess,
  createRestaurantFailure,
  getRestaurantStart,
  getRestaurantSuccess,
  getRestaurantFailure
} from "./RestaurantActions";

const getRestaurant = async (dispatch) => {
  dispatch(getRestaurantStart())
  try {
    const res = await axios.get("api/v1/restaurants")
    dispatch(getRestaurantSuccess(res.data))
  } catch (error) {
    dispatch(getRestaurantFailure())
  }
}

const createRestaurant = async (restaurant, dispatch) => {
  dispatch(createRestaurantStart());
  try {
    const res = await axios.post("api/v1/restaurants", restaurant, {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    });
    dispatch(createRestaurantSuccess(res.data));
    console.log("Restaurant created!");
  } catch (error) {
    dispatch(createRestaurantFailure());
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message); // Throw the error to be caught later
    } else {
      console.log(error.message);
      throw new Error("An error occurred during creation.");
    }
  }
};

export { createRestaurant, getRestaurant };
