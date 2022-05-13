import axios from "axios";
import * as actionTypes from "./actionTypes";
import { USERS_STATS } from "../../constants/backend-urls";

export const fetchUsersStatsStart = () => {
  return {
    type: actionTypes.FETCH_USERS_STATS_START,
  };
};
export const fetchUsersStatsSuccess = (usersStats) => {
  return {
    type: actionTypes.FETCH_USERS_STATS_SUCCESS,
    payload: {
      usersStats: usersStats,
    },
  };
};
export const fetchUsersStatsFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_STATS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchUsersStats = () => {
  return (dispatch) => {
    dispatch(fetchUsersStatsStart());
    axios
      .get(USERS_STATS())
      .then((res) => {
        const usersStats = res.data;
        dispatch(fetchUsersStatsSuccess(usersStats));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUsersStatsFail(err));
      });
  };
};
