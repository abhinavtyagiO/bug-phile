import * as React from "react";
import { Box, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";
import ProjectList from "../components/project-list";
import IssueList from "../components/issue-list";
import Routes from '../routes/protected-routes'

import "./styles.css";

const Layout = () => {
  return (
    <Grid sx={{ display: "flex" }} className="content-grid">
      <ProjectList />
      <IssueList />
      <Routes />
    </Grid>
  );
};

export default Layout;
