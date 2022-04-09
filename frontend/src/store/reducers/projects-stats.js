import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projectsStats: [],
  error: null,
  isLoading: false,
};

const fetchProjectsStatsStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchProjectsStatsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    projectsStats: action.payload.projectsStats,
  };
};

const fetchProjectsStatsFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_STATS_START:
      return fetchProjectsStatsStart(state, action);
    case actionTypes.FETCH_PROJECTS_STATS_SUCCESS:
      return fetchProjectsStatsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_STATS_FAIL:
      return fetchProjectsStatsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
