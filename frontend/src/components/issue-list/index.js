import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
import { links } from "../../constants/frontend-urls";
import { ISSUES } from "../../constants/backend-urls";

const drawerWidth = 240;

const IssueList = (props) => {
  const [issues, setIssues] = useState([]);

  const fetchIssues = () => {
    axios
      .get(ISSUES())
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  console.log(issues);

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
      <List className="issue-list-scrollable">
        {issues.map((issue, index) => (
          <Link to={links.ISSUE(issue.project.id, issue.id)}>
            <IssueListItem key={index} issue={issue} />
          </Link>
        ))}
      </List>
    </div>
  );
};

export default IssueList;
