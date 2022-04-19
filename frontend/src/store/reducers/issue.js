import * as actionTypes from "../actions/actionTypes";

const initialState = {
  issue: null,
  error: null,
  isLoading: false,
};

const fetchIssueStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchIssueSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    issue: action.payload.issue,
  };
};

const fetchIssueFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ISSUE_START:
      return fetchIssueStart(state, action);
    case actionTypes.FETCH_ISSUE_SUCCESS:
      return fetchIssueSuccess(state, action);
    case actionTypes.FETCH_ISSUE_FAIL:
      return fetchIssueFail(state, action);
    default:
      return state;
  }
};

export default reducer;
