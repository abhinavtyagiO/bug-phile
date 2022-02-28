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

const drawerWidth = 240;

const Project = () => {
  return (
    <div className="project-container">
      <h3>Project Name</h3>
      <Divider />
      <div className="project-container-reporter">
        <div className="project-container-info-left">
          <div>CREATED BY</div>
          <div>
            <UserAvatar />
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
            <ProjectStatus />
          </div>
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>MEMBERS</div>
        <div>
          <UserAvatar />
          <UserAvatar />
          <UserAvatar />
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>DESCRIPTION</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
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
