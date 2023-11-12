//get
const getRestaurantStart = () => ({
  type: "GET_REST_START",
});
const getRestaurantSuccess = (restaurants) => ({
  type: "GET_REST_SUCCESS",
  payload: restaurants,
});
const getRestaurantFailure = () => ({
  type: "GET_REST_FAILURE",
});

//create
const createRestaurantStart = () => ({
  type: "CREATE_REST_START",
});

const createRestaurantSuccess = (restaurant) => ({
  type: "CREATE_REST_SUCCESS",
  payload: restaurant,
});

const createRestaurantFailure = () => ({
  type: "CREATE_REST_FAILURE",
});

export {
  createRestaurantStart,
  createRestaurantSuccess,
  createRestaurantFailure,
  getRestaurantStart,
  getRestaurantSuccess,
  getRestaurantFailure
};
