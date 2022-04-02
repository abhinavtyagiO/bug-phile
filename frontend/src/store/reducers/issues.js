import * as actionTypes from "../actions/actionTypes";

const initialState = {
  issues: [],
  error: null,
  isLoading: false,
};

const fetchIssuesStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchIssuesSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    issues: action.payload.issues,
  };
};

const fetchIssuesFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ISSUES_START:
      return fetchIssuesStart(state, action);
    case actionTypes.FETCH_ISSUES_SUCCESS:
      return fetchIssuesSuccess(state, action);
    case actionTypes.FETCH_ISSUES_FAIL:
      return fetchIssuesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
