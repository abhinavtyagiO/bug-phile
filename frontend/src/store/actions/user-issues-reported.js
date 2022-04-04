import axios from "axios";
import * as actionTypes from "./actionTypes";
import { USER_ISSUES_REPORTED } from "../../constants/backend-urls";

export const fetchUserIssuesReportedStart = () => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_REPORTED_START,
  };
};
export const fetchUserIssuesReportedSuccess = (userIssueReported) => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_REPORTED_SUCCESS,
    payload: {
      userIssueReported: userIssueReported,
    },
  };
};
export const fetchUserIssuesReportedFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_REPORTED_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchUserIssuesReported = (id) => {
  return (dispatch) => {
    dispatch(fetchUserIssuesReportedStart());
    axios
      .get(USER_ISSUES_REPORTED(id))
      .then((res) => {
        const userIssueReported = res.data;
        dispatch(fetchUserIssuesReportedSuccess(userIssueReported));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserIssuesReportedFail(err));
      });
  };
};
