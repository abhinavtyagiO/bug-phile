import * as actionTypes from "../actions/actionTypes";

const initialState = {
  usersStats: [],
  error: null,
  isLoading: false,
};

const fetchUsersStatsStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchUsersStatsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    usersStats: action.payload.usersStats,
  };
};

const fetchUsersStatsFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_STATS_START:
      return fetchUsersStatsStart(state, action);
    case actionTypes.FETCH_USERS_STATS_SUCCESS:
      return fetchUsersStatsSuccess(state, action);
    case actionTypes.FETCH_USERS_STATS_FAIL:
      return fetchUsersStatsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
