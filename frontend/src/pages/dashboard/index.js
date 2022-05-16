import React, { useEffect } from "react";
import { connect } from "react-redux";
import "chart.js";
import { BarChart, PieChart } from "react-chartkick";
import { Divider, CircularProgress, Typography } from "@mui/material";
import ProjectStats from "../../components/project-stats";
import "./styles.css";
import { fetchProjectsStats } from "../../store/actions/projects-stats";
import { fetchUsersStats } from "../../store/actions/users-stats";

const Dashboard = (props) => {
  var usersData = [];

  const getUsersData = () => {
    props.usersStats &&
      props.usersStats.map((stat) => {
        var userStat = [stat.name, stat.numIssues];
        usersData.push(userStat);
      });
  };

  useEffect(() => {
    props.fetchProjectsStats();
    props.fetchUsersStats();
  }, []);

  props.usersStats && getUsersData();

  // console.log(usersData);

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
          <Typography style={{ color: "#595858" }}>ISSUE STATS</Typography>
          <div className="dashboard-container-pie-graph"></div>
          <div className="dashboard-container-bar-graph">
            {/* <BarChart data={usersData} /> */}
          </div>
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
    projectsStatsError: state.projectsStats.error,
    projectStatsIsLoading: state.projectsStats.isLoading,

    usersStats: state.usersStats.usersStats,
    usersStatsError: state.usersStats.error,
    usersStatsIsLoading: state.usersStats.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectsStats: () => dispatch(fetchProjectsStats()),
    fetchUsersStats: () => dispatch(fetchUsersStats()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
