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

import IssueListItem from "./IssueListItem";
import "./styles.css";

const drawerWidth = 240;

const IssueList = () => {
  return (
    <div className="issues-list-container">
      <div className="add-btn-container">
        <Button variant="outlined" startIcon={<AddIcon />}>
          ADD PROJECT
        </Button>
        <Button variant="outlined" startIcon={<AddIcon />}>
          ADD PROJECT
        </Button>
      </div>
      <List>
        <IssueListItem />
      </List>
    </div>
  );
};

export default IssueList;
