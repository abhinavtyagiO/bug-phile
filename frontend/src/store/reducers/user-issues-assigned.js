import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userIssuesAssigned: [],
  error: null,
  isLoading: false,
};

const fetchUserIssuesAssignedStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchUserIssuesAssignedSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    userIssuesAssigned: action.payload.userIssuesAssigned,
  };
};

const fetchUserIssuesAssignedFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ISSUES_ASSIGNED_START:
      return fetchUserIssuesAssignedStart(state, action);
    case actionTypes.FETCH_USER_ISSUES_ASSIGNED_SUCCESS:
      return fetchUserIssuesAssignedSuccess(state, action);
    case actionTypes.FETCH_USER_ISSUES_ASSIGNED_FAIL:
      return fetchUserIssuesAssignedFail(state, action);
    default:
      return state;
  }
};

export default reducer;
