import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./App.css";
import BaseRouter from "./routes";
import { isLoggedIn } from "./store/actions/auth";
import { connect } from "react-redux";
import { pages } from "./constants/frontend-urls";

const App = (props) => {
  useEffect(() => {
    props.isLoggedIn();
  }, []);

  return (
    <Router>
      <div className="App">
        {props.isLoading ? <CircularProgress /> : <BaseRouter />}
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.currentUserId!=undefined,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => dispatch(isLoggedIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
