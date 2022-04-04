import axios from "axios";
import * as actionTypes from "./actionTypes";
import { USER } from "../../constants/backend-urls";

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};
export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload: {
      user: user,
    },
  };
};
export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchUser = (id) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    axios
      .get(USER(id))
      .then((res) => {
        const user = res.data;
        dispatch(fetchUserSuccess(user));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserFail(err));
      });
  };
};
