import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROJECTS } from "../../constants/backend-urls";

export const fetchProjectsStart = () => {
  return {
    type: actionTypes.FETCH_PROJECTS_START,
  };
};
export const fetchProjectsSuccess = (projects) => {
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    payload: {
      projects: projects,
    },
  };
};
export const fetchProjectsFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchProjects = () => {
  return (dispatch) => {
    dispatch(fetchProjectsStart());
    axios
      .get(PROJECTS())
      .then((res) => {
        const projects = res.data;
        dispatch(fetchProjectsSuccess(projects));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchProjectsFail(err));
      });
  };
};
