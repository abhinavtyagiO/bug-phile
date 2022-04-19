import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

const fetchUserStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchUserSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    user: action.payload.user,
  };
};

const fetchUserFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_START:
      return fetchUserStart(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return fetchUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
