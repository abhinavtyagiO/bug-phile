import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projects: [],
  error: null,
  isLoading: false,
};

const fetchProjectsStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchProjectsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    projects: action.payload.projects,
  };
};

const fetchProjectsFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_START:
      return fetchProjectsStart(state, action);
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL:
      return fetchProjectsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
