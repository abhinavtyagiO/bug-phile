import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROJECT_ISSUES } from "../../constants/backend-urls";

export const fetchProjectIssuesStart = () => {
  return {
    type: actionTypes.FETCH_PROJECT_ISSUES_START,
  };
};
export const fetchProjectIssuesSuccess = (projectIssues) => {
  return {
    type: actionTypes.FETCH_PROJECT_ISSUES_SUCCESS,
    payload: {
      projectIssues: projectIssues,
    },
  };
};
export const fetchProjectIssuesFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECT_ISSUES_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchProjectIssues = (id) => {
  return (dispatch) => {
    dispatch(fetchProjectIssuesStart());
    axios
      .get(PROJECT_ISSUES(id))
      .then((res) => {
        const projectIssues = res.data;
        dispatch(fetchProjectIssuesSuccess(projectIssues));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchProjectIssuesFail(err));
      });
  };
};
