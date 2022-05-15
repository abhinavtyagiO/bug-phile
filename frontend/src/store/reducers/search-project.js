import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projects: [],
  error: null,
  isLoading: false,
};

const fetchSearchProjectStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchSearchProjectSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    projects: action.payload.projects,
  };
};

const fetchSearchProjectFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_PROJECT_START:
      return fetchSearchProjectStart(state, action);
    case actionTypes.FETCH_SEARCH_PROJECT_SUCCESS:
      return fetchSearchProjectSuccess(state, action);
    case actionTypes.FETCH_SEARCH_PROJECT_FAIL:
      return fetchSearchProjectFail(state, action);
    default:
      return state;
  }
};

export default reducer;
