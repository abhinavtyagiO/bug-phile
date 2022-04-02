import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  error: null,
  isLoading: false,
};

const fetchUsersStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchUsersSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    users: action.payload.users,
  };
};

const fetchUsersFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
