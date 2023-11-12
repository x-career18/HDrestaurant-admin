const RestaurantReducer = (state, action) => {
  switch (action.type) {
    //GET
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

    //CREATE
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

    //UPDATE
    case "UPDATE_REST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_REST_SUCCESS":
      return {
        restaurants: state.restaurants.map(
          (restaurant) =>
            restaurant._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_REST_FAILURE":
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
