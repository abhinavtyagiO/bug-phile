import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { pages } from "../constants/frontend-urls";
import Layout from "../layout";
import * as Components from "../pages";

const BaseRouter = (props) => {
  return (
    <Routes>
      <Route exact path={pages.SIGNIN} element={<Components.Signin />} />
      <Route exact path={pages.ONLOGIN} element={<Components.OnLogin />} />
      <Route
        path="*"
        element={
          <>
            <Header />
            <Layout />
          </>
        }
      />
    </Routes>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.currentUserId != undefined,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps, null)(BaseRouter);
