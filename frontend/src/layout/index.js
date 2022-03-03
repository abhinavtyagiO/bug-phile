import * as React from "react";
import { Box, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";
import ProjectList from "../components/project-list";
import IssueList from "../components/issue-list";
import Issue from "../pages/issue";
import Project from "../pages/project";
import Dashboard from "../pages/dashboard";
import UsersList from "../pages/users_list";
import User from "../pages/user";
import {
  projectListData,
  issueListData,
  userListData,
  issueData,
  projectData,
} from "../mocks/";

import "./styles.css";

const Layout = () => {
  return (
    <Grid sx={{ display: "flex" }} className="content-grid">
      <ProjectList projects={projectListData} />
      <IssueList issues={issueListData} />
      <User userData={userListData[0]} userProjects={projectListData} userIssues={issueListData}  />
    </Grid>
  );
};

export default Layout;
