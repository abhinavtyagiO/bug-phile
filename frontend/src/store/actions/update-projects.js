import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROJECTS } from "../../constants/backend-urls";

export const updateProjectsStart = () => {
  return {
    type: actionTypes.UPDATE_PROJECTS_START,
  };
};
export const updateProjectsSuccess = (projects) => {
  return {
    type: actionTypes.UPDATE_PROJECTS_SUCCESS,
    payload: {
      projects: projects,
    },
  };
};
export const updateProjectsFail = (error) => {
  return {
    type: actionTypes.UPDATE_PROJECTS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const updateProjects = () => {
  return (dispatch) => {
    dispatch(updateProjectsStart());
    axios
      .get(PROJECTS())
      .then((res) => {
        const projects = res.data;
        dispatch(updateProjectsSuccess(projects));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateProjectsFail(err));
      });
  };
};
