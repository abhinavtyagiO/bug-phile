import { Typography } from "@mui/material";
import React from "react";

const ProjectIssueStats = (props) => {
  return (
    <div className="project-container-issue-stats-container">
      {props.stats.map((stat, index) => (
        <div key={index} className="project-container-issue-stats">
          <Typography style={{ color: "#595858", fontWeight: "bold" }}>
            {stat.text}
          </Typography>
          <Typography variant="h2">{stat.numIssues}</Typography>
        </div>
      ))}
    </div>
  );
};

export default ProjectIssueStats;
