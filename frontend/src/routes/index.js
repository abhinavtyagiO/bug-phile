import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { pages } from "../constants/frontend-urls";
import Layout from "../layout";
import * as Components from "../pages";

const BaseRouter = () => {
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

export default BaseRouter;
