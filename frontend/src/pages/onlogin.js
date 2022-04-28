import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { USER_ON_LOGIN } from "../constants/backend-urls";
import { connect } from "react-redux";
import { isLoggedIn } from "../store/actions/auth";

const OnLogin = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const scope = searchParams.get("scope");

  console.log(code, state, scope);

  const login = () => {
    axios
      .post(USER_ON_LOGIN(), {
        code: code,
        state: state,
      })
      .then((res) => {
        console.log("loggedIn");
        console.log(res.data);
        props.isLoggedIn();
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (code && state) {
      login();
    }
  }, []);

  return (
    <div>
      <CircularProgress />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => dispatch(isLoggedIn()),
  };
};

export default connect(null, mapDispatchToProps)(OnLogin);
