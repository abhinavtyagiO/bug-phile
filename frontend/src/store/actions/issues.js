import axios from 'axios';
import { ISSUES, PROJECT_ISSUES_LIST } from '../../constants/backend-urls';
import * as actionTypes from './actionTypes'

export const fetchIssuesStart = () => {
  return {
    type: actionTypes.FETCH_ISSUES_START,
  };
};

export const fetchIssuesSuccess = (issues) => {
  return {
    type: actionTypes.FETCH_ISSUES_SUCCESS,
    payload: {
      issues: issues,
    },
  };
};

export const fetchIssuesFail = (error) => {
  return {
    type: actionTypes.FETCH_ISSUES_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchIssues = (projectId) => {
  return (dispatch) => {
    dispatch(fetchIssuesStart());
    axios
      .get(PROJECT_ISSUES_LIST(projectId))
      .then((res) => {
        const issues = res.data;
        dispatch(fetchIssuesSuccess(issues));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchIssuesFail(err));
      });
  };
};
