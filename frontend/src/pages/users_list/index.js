import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { USERS } from "../../constants/backend-urls";
import { links } from "../../constants/frontend-urls";
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
import { userListData } from "../../mocks/";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(USERS())
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-list-container">
      <h3>Users</h3>
      <Divider />
      {users.map((user, index) => {
        return (
          <Link to={links.USER(user.id)}>
            <ListItem button key={index} className="users-list-container-user">
              <div className="users-list-container-user-avatar">
                <Avatar src={user.avatar} />
                {user.name}
              </div>
              <i>{user.role}</i>
            </ListItem>
          </Link>
        );
      })}
    </div>
  );
};

export default UsersList;
