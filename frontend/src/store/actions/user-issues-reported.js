import axios from "axios";
import * as actionTypes from "./actionTypes";
import { USER_ISSUES_REPORTED } from "../../constants/backend-urls";

export const fetchUserIssuesReportedStart = () => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_REPORTED_START,
  };
};
export const fetchUserIssuesReportedSuccess = (userIssuesReported) => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_REPORTED_SUCCESS,
    payload: {
      userIssuesReported: userIssuesReported,
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
        const userIssuesReported = res.data;
        dispatch(fetchUserIssuesReportedSuccess(userIssuesReported));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserIssuesReportedFail(err));
      });
  };
};
