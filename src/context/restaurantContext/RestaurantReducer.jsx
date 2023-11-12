const RestaurantReducer = (state, action) => {
  switch (action.type) {
    case "GET_REST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "GET_REST_SUCCESS":
      return {
        restaurants: [...state.restaurants, action.payload],
        isFetching: false,
        error: false,
      };
    case "GET_REST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_REST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_REST_SUCCESS":
      return {
        restaurants: [...state.restaurants, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_REST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default RestaurantReducer;
