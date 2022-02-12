import * as React from "react";
import Header from "../../components/header";
import ProjectList from "../../components/project-list";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import './styles.css'

const mdTheme = createTheme();

const Dashboard = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Header />
      {/* <Container className="layout-container">
        <ProjectList />
      </Container> */}
    </ThemeProvider>
  );
};

export default Dashboard;
