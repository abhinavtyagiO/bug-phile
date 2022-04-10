import React from "react";
import { ListItem, Typography } from "@mui/material";
import IssueStatus from "../common/issue-status";
import IssueTag from "../common/issue-tag";

const IssueListItem = (props) => {
  const { index, issue } = props;
  const issueTags = issue.tags;
  const issueStatus = issue.status;
  return (
    <ListItem button key={index} className="issue-list-item">
      <IssueStatus status={issueStatus} />
      <div className="issue-list-item-content">
        <div className="issue-list-item-content-title">
          <Typography variant="body1" style={{ color: "#000000" }}>
            {" "}
            {issue.title} •{" "}
            <span style={{ fontSize: "0.75rem" }}>31/01/2022</span>
          </Typography>
        </div>
        <div className="issue-list-item-content-reporter">
          <Typography variant="subtitle2" style={{ color: "#6C6F72" }}>
            {" "}
            By: {issue.reporter.name}
          </Typography>
        </div>
        <div className="issue-list-item-content-tags">
          {issueTags.map((tag, index) => {
            return <IssueTag tag={tag} index={index} />;
          })}
        </div>
      </div>
    </ListItem>
  );
};

export default IssueListItem;
