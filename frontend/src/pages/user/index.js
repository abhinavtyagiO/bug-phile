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
  Tab,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
import { TabList, TabContext, TabPanel } from "@mui/lab";

import ProjectStatus from "../../components/common/project-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import IssueStatus from "../../components/common/issue-status";
import "./styles.css";
import { projectListData, issueListData, userListData } from "../../mocks/";

const User = (props) => {
  const [value, setValue] = React.useState("1");

  const userData = userListData[0];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="user-container">
      <div className="user-container-user-info">
        <Avatar src={userData.avatar} />
        <div className="user-container-user-info-name">
          <div>{userData.name}</div>
          <div>{userData.role}</div>
        </div>
      </div>
      <Divider />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="PROJECTS" value="1" />
          <Tab label="ISSUES REPORTED" value="2" />
          <Tab label="ISSUES ASSIGNED" value="3" />
        </TabList>
        <TabPanel value="1">
          {projectListData.map((project, index) => {
            return (
              <div key={index} className="user-container-user-info">
                <Avatar src={project.image} />
                <div className="user-container-user-info-name">
                  <div>{project.name}</div>
                  <ProjectStatus status={project.status} />
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value="2">
          {issueListData.map((issue, index) => {
            return (
              <ListItem button key={"text"} className="issue-list-item">
                <IssueStatus status={issue.status} />
                <div className="issue-list-item-content">
                  <div className="issue-list-item-content-title">
                    {issue.title} • <span>31/01/2022</span>
                  </div>
                  <div className="issue-list-item-content-reporter">
                    By: {issue.reporter}
                  </div>
                  <div className="issue-list-item-content-tags">
                    {issue.tags.map((tag, index) => {
                      return <IssueTag tag={tag} index={index} />;
                    })}
                  </div>
                </div>
              </ListItem>
            );
          })}
        </TabPanel>
        <TabPanel value="3">
          {issueListData.map((issue, index) => {
            return (
              <ListItem button key={"text"} className="issue-list-item">
                <IssueStatus status={issue.status} />
                <div className="issue-list-item-content">
                  <div className="issue-list-item-content-title">
                    {issue.title} • <span>31/01/2022</span>
                  </div>
                  <div className="issue-list-item-content-reporter">
                    By: {issue.reporter}
                  </div>
                  <div className="issue-list-item-content-tags">
                    {issue.tags.map((tag, index) => {
                      return <IssueTag tag={tag} index={index} />;
                    })}
                  </div>
                </div>
              </ListItem>
            );
          })}
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default User;
