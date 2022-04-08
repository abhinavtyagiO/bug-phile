import * as actionTypes from "../actions/actionTypes";

const initialState = {
  issues: [],
  error: null,
  isLoading: false,
};

const updateIssuesStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const updateIssuesSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    issues: action.payload.issues,
  };
};

const updateIssuesFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ISSUES_START:
      return updateIssuesStart(state, action);
    case actionTypes.UPDATE_ISSUES_SUCCESS:
      return updateIssuesSuccess(state, action);
    case actionTypes.UPDATE_ISSUES_FAIL:
      return updateIssuesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
