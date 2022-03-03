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

import ProjectStatus from "../../components/common/project-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";

const Project = (props) => {
  return (
    <div className="project-container">
      <h3>{props.project.name}</h3>
      <Divider />
      <div className="project-container-reporter">
        <div className="project-container-info-left">
          <div>CREATED BY</div>
          <div>
            <UserAvatar user={props.project.creator} />
          </div>
        </div>
        <div className="project-container-info-right">
          <div>CREATED ON</div>
          <div>30/01/2022</div>
        </div>
      </div>
      <Divider />
      <div className="project-container-reporter">
        <div className="project-container-info-left">
          <div>STATUS</div>
          <div>
            <ProjectStatus status={props.project.status} />
          </div>
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>MEMBERS</div>
        <div>
          {props.project.members.map((member, index) => {
            return <UserAvatar user={member} />;
          })}
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>DESCRIPTION</div>
        <div dangerouslySetInnerHTML={{__html: props.project.description}} />
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>ISSUE STATS</div>
        <div className="project-container-issue-stats-container">
          <div className="project-container-issue-stats">
            <div>Total Issues</div>
            <h1>105</h1>
          </div>
          <div className="project-container-issue-stats">
            <div>Total Issues</div>
            <h1>105</h1>
          </div>
          <div className="project-container-issue-stats">
            <div>Total Issues</div>
            <h1>105</h1>
          </div>
          <div className="project-container-issue-stats">
            <div>Total Issues</div>
            <h1>105</h1>
          </div>
          <div className="project-container-issue-stats">
            <div>Total Issues</div>
            <h1>105</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
