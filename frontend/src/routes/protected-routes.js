import React from "react";
import { Route, Routes } from "react-router-dom";
import { pages } from "../constants/frontend-urls";
import * as Components from "../pages";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route exact path={pages.DASHBOARD} element={<Components.Dashboard />} />
      <Route exact path={pages.USERS} element={<Components.UsersList />} />
      <Route exact path={pages.USER} element={<Components.User />} />
      <Route exact path={pages.PROJECT} element={<Components.Project />} />
      <Route exact path={pages.ISSUE} element={<Components.Issue />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default ProtectedRoutes;
