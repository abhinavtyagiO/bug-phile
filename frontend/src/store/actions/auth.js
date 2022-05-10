import axios from "axios";
import { USER_ON_LOGOUT, WHO_AM_I } from "../../constants/backend-urls";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      currentUserId: id,
    },
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error: error,
    },
  };
};

export const authLogout = () => {
  axios
    .post(USER_ON_LOGOUT(), {})
    .then((res) => {})
    .catch((err) => console.log(err));
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const isLoggedIn = () => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .get(WHO_AM_I())
      .then((res) => {
        console.log(res.data);
        const id = res.data.id;
        dispatch(authSuccess(id));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
