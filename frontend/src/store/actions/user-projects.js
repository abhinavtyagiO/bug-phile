import axios from "axios";
import * as actionTypes from "./actionTypes";
import { USER_PROJECTS } from "../../constants/backend-urls";

export const fetchUserProjectsStart = () => {
  return {
    type: actionTypes.FETCH_USER_PROJECTS_START,
  };
};
export const fetchUserProjectsSuccess = (userProjects) => {
  return {
    type: actionTypes.FETCH_USER_PROJECTS_SUCCESS,
    payload: {
      userProjects: userProjects,
    },
  };
};
export const fetchUserProjectsFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_PROJECTS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchUserProjects = (id) => {
  return (dispatch) => {
    dispatch(fetchUserProjectsStart());
    axios
      .get(USER_PROJECTS(id))
      .then((res) => {
        const userProjects = res.data;
        dispatch(fetchUserProjectsSuccess(userProjects));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserProjectsFail(err));
      });
  };
};
