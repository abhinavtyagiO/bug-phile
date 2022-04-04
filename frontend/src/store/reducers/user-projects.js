import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userProjects: [],
  error: null,
  isLoading: false,
};

const fetchUserProjectsStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchUserProjectsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    userProjects: action.payload.userProjects,
  };
};

const fetchUserProjectsFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROJECTS_START:
      return fetchUserProjectsStart(state, action);
    case actionTypes.FETCH_USER_PROJECTS_SUCCESS:
      return fetchUserProjectsSuccess(state, action);
    case actionTypes.FETCH_USER_PROJECTS_FAIL:
      return fetchUserProjectsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
