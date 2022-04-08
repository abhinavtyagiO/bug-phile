import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Button, List, Skeleton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";

import IssueListItem from "./IssueListItem";
import "./styles.css";
import AddIssueWithModal from "../add-issue-with-modal";
import { links } from "../../constants/frontend-urls";
import { fetchIssues } from "../../store/actions/issues";
import IssueListSkeleton from "./skeleton";

const IssueList = (props) => {
  const params = useParams();
  const projectId = params["*"].split("/")[1];

  useEffect(() => {
    if (Number.isInteger(parseInt(projectId))) {
      props.fetchIssues(projectId);
    }
  }, [projectId]);

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
        {props.isLoading ? (
          <>
            <IssueListSkeleton />
            <IssueListSkeleton />
            <IssueListSkeleton />
            <IssueListSkeleton />
            <IssueListSkeleton />
            {/* {Array.from(Array(5)).forEach(() => (
            ))} */}
          </>
        ) : props.error ? (
          <></>
        ) : (
          props.issues.map((issue, index) => (
            <Link to={links.ISSUE(issue.project.id, issue.id)}>
              <IssueListItem key={index} issue={issue} />
            </Link>
          ))
        )}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues.issues,
    error: state.issues.error,
    isLoading: state.issues.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssues: (projectId) => dispatch(fetchIssues(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
