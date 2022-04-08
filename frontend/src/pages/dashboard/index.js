import React, { useEffect, useState } from "react";
import axios from "axios";
// import "chart.js";
import {
  Button,
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
// import { Pie } from "react-chartjs-2";

import "./styles.css";
import ProjectStats from "../../components/project-stats";
import { dashboardProjectStatsList } from "../../mocks";
import { PROJECT_STATS } from "../../constants/backend-urls";

const Dashboard = () => {
  const [projectStats, setProjectStats] = useState();
  const [apiCall, setApiCall] = useState({
    isLoading: false,
    error: false,
  });

  const fetchProjectStats = () => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(PROJECT_STATS())
      .then((res) => {
        setProjectStats(res.data);
        setApiCall({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setApiCall({
          isLoading: false,
          error: err,
        });
      });
  };

  useEffect(() => {
    fetchProjectStats();
  }, []);

  return !apiCall.isLoading && projectStats ? (
    <div className="dashboard-container">
      <div className="dashboard-container-info-left">
        <div>PROJECT STATS</div>
        <ProjectStats stats={projectStats} />
      </div>
      <Divider />
      <div className="dashboard-container-graph-container">
        <div className="dashboard-container-graph">
          <div>ISSUE STATS</div>
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

export default Dashboard;
