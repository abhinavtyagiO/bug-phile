import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import "chart.js";
import { Divider, CircularProgress, Typography } from "@mui/material";
// import { Pie } from "react-chartjs-2";

import ProjectStats from "../../components/project-stats";
import "./styles.css";
import { fetchProjectsStats } from "../../store/actions/projects-stats";

const Dashboard = (props) => {
  useEffect(() => {
    props.fetchProjectsStats();
  }, []);

  return props.isLoading ? (
    <>
      <CircularProgress />
    </>
  ) : props.error ? (
    <></>
  ) : props.projectsStats ? (
    <div className="dashboard-container">
      <div className="dashboard-container-info-left">
        <Typography style={{ color: "#595858" }}>PROJECT STATS</Typography>
        <ProjectStats stats={props.projectsStats} />
      </div>
      <Divider />
      <div className="dashboard-container-graph-container">
        <div className="dashboard-container-graph">
          <Typography style={{ color: "#595858" }} >ISSUE STATS</Typography>
          {/* <div className='dashboard-container-pie-graph'>
            <Pie data={data} />
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

const mapStateToProps = (state) => {
  return {
    projectsStats: state.projectsStats.projectsStats,
    error: state.projectsStats.error,
    isLoading: state.projectsStats.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectsStats: () => dispatch(fetchProjectsStats()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
