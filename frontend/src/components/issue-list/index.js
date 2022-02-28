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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

import IssueListItem from "./IssueListItem";
import "./styles.css";
import AddIssueWithModal from "../add-issue-with-modal";

const drawerWidth = 240;

const IssueList = (props) => {
  return (
    <div className="issues-list-container">
      <div className="add-btn-container">
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          FILTER
        </Button>
        <AddIssueWithModal />
      </div>
      <List>
        {
          props.issues.map((issue, index) => (
            <IssueListItem key={index} issue={issue} />
        ))}
      </List>
    </div>
  );
};

export default IssueList;
