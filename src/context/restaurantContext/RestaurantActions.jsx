//create
export const createRestaurantStart = () => ({
  type: "CREATE_REST_START",
});

export const createRestaurantSuccess = (restaurant) => ({
  type: "CREATE_REST_SUCCESS",
  payload: restaurant,
});

export const createRestaurantFailure = () => ({
  type: "CREATE_REST_FAILURE",
});
