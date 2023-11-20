//login
export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: {
    ...user,
    restaurantId: user.restaurantId,
    employeeCode: user.employeeCode,
  },
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

