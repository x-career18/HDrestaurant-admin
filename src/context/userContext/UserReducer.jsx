const UserReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "REGISTER_SUCCESS":
      return {
        users: [...state.users, action.payload],
        isFetching: false,
        error: false,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
