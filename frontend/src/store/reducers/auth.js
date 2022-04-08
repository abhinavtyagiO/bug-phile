import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  currentUserId: null,
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    currentUserId: action.payload.currentUserId,
    error: null,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.payload.error,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    error: null,
    currentUserId: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    default:
      return state;
  }
};

export default reducer;
