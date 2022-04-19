import axios from 'axios';
import { ISSUE_COMMENTS } from '../../constants/backend-urls';
import * as actionTypes from './actionTypes'

export const fetchIssueCommentsStart = () => {
  return {
    type: actionTypes.FETCH_ISSUE_COMMENTS_START,
  };
};

export const fetchIssueCommentsSuccess = (issueComments) => {
  return {
    type: actionTypes.FETCH_ISSUE_COMMENTS_SUCCESS,
    payload: {
      issueComments: issueComments,
    },
  };
};

export const fetchIssueCommentsFail = (error) => {
  return {
    type: actionTypes.FETCH_ISSUE_COMMENTS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchIssueComments = (id) => {
  return (dispatch) => {
    dispatch(fetchIssueCommentsStart());
    axios
      .get(ISSUE_COMMENTS(id))
      .then((res) => {
        const issueComments = res.data;
        dispatch(fetchIssueCommentsSuccess(issueComments));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchIssueCommentsFail(err));
      });
  };
};
