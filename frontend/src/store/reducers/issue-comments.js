import * as actionTypes from "../actions/actionTypes";

const initialState = {
  issueComments: [],
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
    issueComments: action.payload.issueComments,
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
    case actionTypes.FETCH_ISSUE_COMMENTS_START:
      return fetchIssueStart(state, action);
    case actionTypes.FETCH_ISSUE_COMMENTS_SUCCESS:
      return fetchIssueSuccess(state, action);
    case actionTypes.FETCH_ISSUE_COMMENTS_FAIL:
      return fetchIssueFail(state, action);
    default:
      return state;
  }
};

export default reducer;
