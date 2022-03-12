import React from "react";

const  ProjectIssueStats = (props) => {
  return (
    <div className="project-container-issue-stats-container">
      {props.stats.map((stat, index) => (
        <div key={index} className="project-container-issue-stats">
          <div>{stat.text}</div>
          <h1>{stat.numIssues}</h1>
        </div>
      ))}
    </div>
  );
};

export default ProjectIssueStats;
