import React from "react";
import { ListItem } from "@mui/material";
import IssueStatus from "../common/issue-status";
import IssueTag from "../common/issue-tag";

const IssueListItem = (props) => {
  return (
    <ListItem button key={"text"} className="issue-list-item">
      <IssueStatus />
      <div className="issue-list-item-content">
        <div className="issue-list-item-content-title">
          App is not responsive •<span>31/01/2022</span>
        </div>
        <div className="issue-list-item-content-reporter">
          By: Mihir Sachdeva
        </div>
        <div className="issue-list-item-content-tags">
          <IssueTag />
          <IssueTag />
          <IssueTag />
        </div>
      </div>
    </ListItem>
  );
};

export default IssueListItem;
