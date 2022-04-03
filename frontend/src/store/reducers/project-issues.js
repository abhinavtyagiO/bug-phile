import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projectIssues: [],
  error: null,
  isLoading: false,
};

const fetchProjectIssuesStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchProjectIssuesSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    projectIssues: action.payload.projectIssues,
  };
};

const fetchProjectIssuesFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT_ISSUES_START:
      return fetchProjectIssuesStart(state, action);
    case actionTypes.FETCH_PROJECT_ISSUES_SUCCESS:
      return fetchProjectIssuesSuccess(state, action);
    case actionTypes.FETCH_PROJECT_ISSUES_FAIL:
      return fetchProjectIssuesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
