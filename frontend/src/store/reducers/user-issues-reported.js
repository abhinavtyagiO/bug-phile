import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userIssuesReported: [],
  error: null,
  isLoading: false,
};

const fetchUserIssuesReportedStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchUserIssuesReportedSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    userIssuesReported: action.payload.userIssuesReported,
  };
};

const fetchUserIssuesReportedFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ISSUES_REPORTED_START:
      return fetchUserIssuesReportedStart(state, action);
    case actionTypes.FETCH_USER_ISSUES_REPORTED_SUCCESS:
      return fetchUserIssuesReportedSuccess(state, action);
    case actionTypes.FETCH_USER_ISSUES_REPORTED_FAIL:
      return fetchUserIssuesReportedFail(state, action);
    default:
      return state;
  }
};

export default reducer;
