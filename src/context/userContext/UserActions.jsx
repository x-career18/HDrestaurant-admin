//register
export const registerStart = () => ({
  type: "REGISTER_START",
});

export const registerSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

export const registerFailure = () => ({
  type: "REGISTER_FAILURE",
});
