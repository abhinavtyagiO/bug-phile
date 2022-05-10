import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentUserId: null,
  error: null,
  isLoading: false,
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    isLoading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    currentUserId: action.payload.currentUserId,
    isLoading: false,
    error: null,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    error: null,
    isLoading: false,
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
