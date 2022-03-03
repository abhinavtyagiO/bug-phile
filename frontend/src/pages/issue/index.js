import * as React from "react";
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

import IssueStatus from "../../components/common/issue-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";

const Issue = (props) => {
  console.log(props.issue);
  return (
    <div className="issue-container">
      <h3>{props.issue.title}</h3>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>REPORTED BY</div>
          <div>
            <UserAvatar user={props.issue.reporter} />
          </div>
        </div>
        <div className="issue-container-info-right">
          <div>CREATED ON</div>
          <div>30/01/2022</div>
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>TAGS</div>
        <div className="issue-container-assignee">
        {props.issue.tags.map((tag, index) => {
          return <IssueTag tag={tag} index={index} />;
        })}
        </div>
      </div>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>STATUS</div>
          <IssueStatus status={props.issue.status} />
        </div>
        <div className="issue-container-info-right">
          <div>PRIORITY</div>
          <IssuePriority priority={props.issue.priority} />
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>ASSIGNEES</div>
        <div className="issue-container-assignee">
          {props.issue.assignee.map((user, index) => {
            return <UserAvatar user={user} />;
          })}
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>DESCRIPTION</div>
        <div dangerouslySetInnerHTML={{ __html: props.issue.description }} />
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>COMMENTS</div>
        {props.issue.comments.map((comment, index) => {
          return (
            <div className="issue-container-comment-box">
              <Avatar src={comment.commenter.avatar} />
              <div className="issue-container-comment-content">
                <div className="">
                  {comment.commenter.name} <span>14:48 • 31/01/2022</span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                  className=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Issue;
