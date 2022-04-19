import * as actionTypes from "../actions/actionTypes";

const initialState = {
  project: null,
  error: null,
  isLoading: false,
};

const fetchProjectStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchProjectSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    project: action.payload.project,
  };
};

const fetchProjectFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT_START:
      return fetchProjectStart(state, action);
    case actionTypes.FETCH_PROJECT_SUCCESS:
      return fetchProjectSuccess(state, action);
    case actionTypes.FETCH_PROJECT_FAIL:
      return fetchProjectFail(state, action);
    default:
      return state;
  }
};

export default reducer;
