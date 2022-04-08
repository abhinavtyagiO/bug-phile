import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projects: [],
  error: null,
  isLoading: false,
};

const updateProjectsStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const updateProjectsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    projects: action.payload.projects,
  };
};

const updateProjectsFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROJECTS_START:
      return updateProjectsStart(state, action);
    case actionTypes.UPDATE_PROJECTS_SUCCESS:
      return updateProjectsSuccess(state, action);
    case actionTypes.UPDATE_PROJECTS_FAIL:
      return updateProjectsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
