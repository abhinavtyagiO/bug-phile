import axios from "axios";
import { USER_LOGGED_IN, USER_ON_LOGOUT } from "../../constants/backend-urls";
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
      .get(USER_LOGGED_IN())
      .then((res) => {
        console.log(res.data);
        const id = res.data.id;
        localStorage.setItem("id", id);
        dispatch(authSuccess(id));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
