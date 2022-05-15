import axios from "axios";
import { SEARCH_PROJECT } from "../../constants/backend-urls";
import * as actionTypes from "./actionTypes";

export const fetchSearchProjectStart = () => {
  return {
    type: actionTypes.FETCH_SEARCH_PROJECT_START,
  };
};

export const fetchSearchProjectSuccess = (projects) => {
  return {
    type: actionTypes.FETCH_SEARCH_PROJECT_SUCCESS,
    payload: {
      projects: projects,
    },
  };
};

export const fetchSearchProjectFail = (error) => {
  return {
    type: actionTypes.FETCH_SEARCH_PROJECT_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchSearchProject = (project) => {
  return (dispatch) => {
    dispatch(fetchSearchProjectStart());
    axios
      .get(SEARCH_PROJECT(project))
      .then((res) => {
        const projects = res.data;
        dispatch(fetchSearchProjectSuccess(projects));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchSearchProjectFail(err));
      });
  };
};
