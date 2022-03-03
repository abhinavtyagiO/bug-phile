import React from "react";
import { ListItem } from "@mui/material";
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
          {issue.title} • <span>31/01/2022</span>
        </div>
        <div className="issue-list-item-content-reporter">
          By: {issue.reporter}
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
