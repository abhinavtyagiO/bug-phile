import * as React from "react";
import { Box, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";
import ProjectList from "../components/project-list";
import IssueList from "../components/issue-list";
import Issue from "../pages/issue";

import "./styles.css";

const Layout = () => {
  return (
    <Grid sx={{ display: "flex" }} className="content-grid">
      <ProjectList />
      <IssueList />
      <Issue />
    </Grid>
  );
};

export default Layout;
