import * as React from "react";
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
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
// import { Pie } from "react-chartjs-2";

import "./styles.css";
import ProjectStats from "../../components/project-stats";
import { dashboardProjectStatsList } from "../../mocks";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-container-info-left">
        <div>PROJECT STATS</div>
        <ProjectStats stats={dashboardProjectStatsList} />
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
  );
};

export default Dashboard;
