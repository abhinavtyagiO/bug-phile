import axios from "axios";
import * as actionTypes from "./actionTypes";
import { USER_ISSUES_ASSIGNED } from "../../constants/backend-urls";

export const fetchUserIssuesAssignedStart = () => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_ASSIGNED_START,
  };
};
export const fetchUserIssuesAssignedSuccess = (userIssuesAssigned) => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_ASSIGNED_SUCCESS,
    payload: {
      userIssuesAssigned: userIssuesAssigned,
    },
  };
};
export const fetchUserIssuesAssignedFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_ISSUES_ASSIGNED_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchUserIssuesAssigned = (id) => {
  return (dispatch) => {
    dispatch(fetchUserIssuesAssignedStart());
    axios
      .get(USER_ISSUES_ASSIGNED(id))
      .then((res) => {
        const userIssuesAssigned = res.data;
        dispatch(fetchUserIssuesAssignedSuccess(userIssuesAssigned));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserIssuesAssignedFail(err));
      });
  };
};
