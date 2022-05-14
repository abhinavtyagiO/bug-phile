import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Button, List, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import IssueListItem from "./IssueListItem";
import "./styles.css";
import AddIssueWithModal from "../add-issue-with-modal";
import { links } from "../../constants/frontend-urls";
import { fetchIssues } from "../../store/actions/issues";
import IssueListSkeleton from "./skeleton";
import choose from "../../assets/choose.svg";

const IssueList = (props) => {
  const params = useParams();
  const projectId = params["*"].split("/")[1];

  console.log(projectId);

  useEffect(() => {
    if (Number.isInteger(parseInt(projectId))) {
      props.fetchIssues(projectId);
    }
  }, [projectId]);

  return projectId == undefined ? (
    <div className="issues-list-container">
      <div className="empty-issue-list">
        <img className="empty-issue-list-image" src={choose} />
        <Typography variant="body1" style={{ color: "#757575" }}>
          {" "}
          Select a project to see it's issues.
        </Typography>
      </div>
    </div>
  ) : (
    <div className="issues-list-container">
      <div className="add-btn-container">
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          style={{ color: "#9AA0A6", borderColor: "#9AA0A6" }}
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
            <Link
              to={links.ISSUE(issue.project.id, issue.id)}
              className="issue-list-link"
            >
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
