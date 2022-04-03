import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROJECT } from "../../constants/backend-urls";

export const fetchProjectStart = () => {
  return {
    type: actionTypes.FETCH_PROJECT_START,
  };
};
export const fetchProjectSuccess = (project) => {
  return {
    type: actionTypes.FETCH_PROJECT_SUCCESS,
    payload: {
      project: project,
    },
  };
};
export const fetchProjectFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECT_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchProject = (id) => {
  return (dispatch) => {
    dispatch(fetchProjectStart());
    axios
      .get(PROJECT(id))
      .then((res) => {
        const project = res.data;
        dispatch(fetchProjectSuccess(project));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchProjectFail(err));
      });
  };
};
