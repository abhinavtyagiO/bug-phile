import axios from "axios";
import * as actionTypes from "./actionTypes";
import { USERS } from "../../constants/backend-urls";

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: {
      users: users,
    },
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios
      .get(USERS())
      .then((res) => {
        const users = res.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUsersFail(err));
      });
  };
};
