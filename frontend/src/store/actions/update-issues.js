import axios from "axios";
import * as actionTypes from "./actionTypes";
import { ISSUES } from "../../constants/backend-urls";

export const updateIssuesStart = () => {
  return {
    type: actionTypes.UPDATE_ISSUES_START,
  };
};
export const updateIssuesSuccess = (issues) => {
  return {
    type: actionTypes.UPDATE_ISSUES_SUCCESS,
    payload: {
      issues: issues,
    },
  };
};
export const updateIssuesFail = (error) => {
  return {
    type: actionTypes.UPDATE_ISSUES_FAIL,
    payload: {
      error: error,
    },
  };
};

export const updateIssues = () => {
  return (dispatch) => {
    dispatch(updateIssuesStart());
    axios
      .get(ISSUES())
      .then((res) => {
        const issues = res.data;
        dispatch(updateIssuesSuccess(issues));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateIssuesFail(err));
      });
  };
};
