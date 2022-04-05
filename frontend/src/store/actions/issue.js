import axios from 'axios';
import { ISSUE } from '../../constants/backend-urls';
import * as actionTypes from './actionTypes'

export const fetchIssueStart = () => {
  return {
    type: actionTypes.FETCH_ISSUE_START,
  };
};

export const fetchIssueSuccess = (issue) => {
  return {
    type: actionTypes.FETCH_ISSUE_SUCCESS,
    payload: {
      issue: issue,
    },
  };
};

export const fetchIssueFail = (error) => {
  return {
    type: actionTypes.FETCH_ISSUE_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchIssue = (id) => {
  return (dispatch) => {
    dispatch(fetchIssueStart());
    axios
      .get(ISSUE(id))
      .then((res) => {
        const issue = res.data;
        dispatch(fetchIssueSuccess(issue));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchIssueFail(err));
      });
  };
};
