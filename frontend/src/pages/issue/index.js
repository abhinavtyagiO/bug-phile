import * as React from "react";
import {
  Button,
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";

import IssueStatus from "../../components/common/issue-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";

const drawerWidth = 240;

const Issue = () => {
  return (
    <div className="issue-container">
      <h3>App is not responsive</h3>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>REPORTED BY</div>
          <div>
            <UserAvatar />
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
        <div>
          <IssueTag />
        </div>
      </div>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>STATUS</div>
          <div>
            <IssueStatus />
            <IssueStatus />
            <IssueStatus />
            <IssueStatus />
          </div>
        </div>
        <div className="issue-container-info-right">
          <div>PRIORITY</div>
          <div>
            <IssuePriority />
          </div>
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>ASSIGNEES</div>
        <div>
          <UserAvatar />
          <UserAvatar />
          <UserAvatar />
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
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
      <div className="issue-container-info-left">
        <div>COMMENTS</div>
        <div>
          //TO BE DONE
        </div>
      </div>
    </div>
  );
};

export default Issue;
