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

const User = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="user-container">
      <div className="user-container-user-info">
        <Avatar />
        <div className="user-container-user-info-name">
          <div>Abhinav Tyagi</div>
          <div>Developer</div>
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
          <div className="user-container-user-info">
            <Avatar />
            <div className="user-container-user-info-name">
              <div>Project Name</div>
              <div>Testing</div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
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
        </TabPanel>
        <TabPanel value="3">
          <ListItem button key={"text"} className="issue-list-item">
            <IssueStatus />
            <div className="issue-list-item-content">
              <div className="issue-list-item-content-title">
                App is not responsive •<span> 31/01/2022</span>
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
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default User;
