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

const UsersList = (props) => {
  return (
    <div className="users-list-container">
      <h3>Users</h3>
      <Divider />
      {props.usersList.map((user, index) => {
        return (
          <div key={index} className="users-list-container-user">
            <div className="users-list-container-user-avatar">
              <Avatar src={user.avatar} />
              {user.name}
            </div>
            <i>{user.role}</i>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
