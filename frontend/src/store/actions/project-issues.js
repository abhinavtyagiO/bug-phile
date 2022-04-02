import axios from 'axios';
import { ISSUES } from '../../constants/backend-urls';
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

export const fetchIssues = () => {
  return (dispatch) => {
    dispatch(fetchIssuesStart());
    axios
      .get(ISSUES())
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
