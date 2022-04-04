import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import {
  Divider,
  ListItem,
  Avatar,
  Tab,
  CircularProgress,
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";

import ProjectStatus from "../../components/common/project-status";
import IssueTag from "../../components/common/issue-tag";
import IssueStatus from "../../components/common/issue-status";
import "./styles.css";
import { connect } from "react-redux";
import { fetchUser } from "../../store/actions/user";
import { fetchUserProjects } from "../../store/actions/user-projects";
import { fetchUserIssuesReported } from "../../store/actions/user-issues-reported";
import { fetchUserIssuesAssigned } from "../../store/actions/user-issues-assigned";

const User = (props) => {
  const { id } = useParams();
  const [value, setValue] = useState("1");

  console.log(id);

  console.log(props);

  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      props.fetchUser(id);
    }
  }, [props.fetchUser]);

  console.log(props.user);
  console.log(props.userProjects);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return !(props.isLoading &&
    props.userProjectsIsLoading &&
    props.userIssuesAssignedIsLoading &&
    props.userIssuesReportedIsLoading) ? (
    <div className="user-container">
      <div className="user-container-user-info">
        <Avatar src={props.user.avatar} />
        <div className="user-container-user-info-name">
          <div>{props.user.name}</div>
          <div>{props.user.role}</div>
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
          {props.userProjects.projects.map((project, index) => {
            return (
              <Link to={links.PROJECT(project.id)}>
                <ListItem
                  button
                  key={index}
                  className="user-container-user-info"
                >
                  <Avatar src={project.image} />
                  <div className="user-container-user-info-name">
                    <div>{project.name}</div>
                    <ProjectStatus status={project.status} />
                  </div>
                </ListItem>
              </Link>
            );
          })}
        </TabPanel>
        <TabPanel value="2">
          {props.userIssuesReported.issuesReported.map((issue, index) => {
            return (
              <Link to={links.ISSUE(issue.project.id, issue.id)}>
                <ListItem button key={"text"} className="issue-list-item">
                  <IssueStatus status={issue.status} />
                  <div className="issue-list-item-content">
                    <div className="issue-list-item-content-title">
                      {issue.title} • <span>31/01/2022</span>
                    </div>
                    <div className="issue-list-item-content-reporter">
                      By: {issue.reporter.name}
                    </div>
                    <div className="issue-list-item-content-tags">
                      {issue.tags.map((tag, index) => {
                        return <IssueTag tag={tag} index={index} />;
                      })}
                    </div>
                  </div>
                </ListItem>
              </Link>
            );
          })}
        </TabPanel>
        <TabPanel value="3">
          {props.userIssuesAssigned.issuesAssigned.map((issue, index) => {
            return (
              <Link to={links.ISSUE(issue.project.id, issue.id)}>
                <ListItem button key={"text"} className="issue-list-item">
                  <IssueStatus status={issue.status} />
                  <div className="issue-list-item-content">
                    <div className="issue-list-item-content-title">
                      {issue.title} • <span>31/01/2022</span>
                    </div>
                    <div className="issue-list-item-content-reporter">
                      By: {issue.reporter.name}
                    </div>
                    <div className="issue-list-item-content-tags">
                      {issue.tags.map((tag, index) => {
                        return <IssueTag tag={tag} index={index} />;
                      })}
                    </div>
                  </div>
                </ListItem>
              </Link>
            );
          })}
        </TabPanel>
      </TabContext>
    </div>
  ) : (
    <CircularProgress />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    error: state.user.error,
    isLoading: state.user.isLoading,

    userProjects: state.userProjects.userProjects,
    userProjectsError: state.userProjects.error,
    userProjectsIsLoading: state.userProjects.isLoading,

    userIssuesReported: state.userIssuesReported.userIssuesReported,
    userIssuesReportedError: state.userIssuesReported.error,
    userIssuesReportedIsLoading: state.userIssuesReported.isLoading,

    userIssuesAssigned: state.userIssuesAssigned.userIssuesAssigned,
    userIssuesAssignedError: state.userIssuesAssigned.error,
    userIssuesAssignedIsLoading: state.userIssuesAssigned.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchUserProjects: (id) => dispatch(fetchUserProjects(id)),
    fetchUserIssuesReported: (id) => dispatch(fetchUserIssuesReported(id)),
    fetchUserIssuesAssigned: (id) => dispatch(fetchUserIssuesAssigned(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
