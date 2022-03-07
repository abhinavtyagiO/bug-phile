import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import axios from "axios";
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
  CircularProgress,
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
import { projectListData, issueListData, userListData } from "../../mocks/";
import {
  USER,
  USER_ISSUES_ASSIGNED,
  USER_ISSUES_REPORTED,
  USER_PROJECTS,
} from "../../constants/backend-urls";

const User = (props) => {
  const { id } = useParams();
  const [value, setValue] = useState("1");
  const [user, setUser] = useState();
  const [userProjects, setUserProjects] = useState();
  const [userIssuesAssigned, setUserIssuesAssigned] = useState();
  const [userIssuesReported, setUserIssuesReported] = useState();
  const [apiCall, setApiCall] = useState({
    isLoading: false,
    error: false,
  });

  console.log(id);

  const fetchUser = (id) => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(USER(id))
      .then((res) => {
        setUser(res.data);
        setApiCall({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setApiCall({
          isLoading: false,
          error: err,
        });
      });
  };

  const fetchUserProjects = (id) => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(USER_PROJECTS(id))
      .then((res) => {
        setUserProjects(res.data);
        setApiCall({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setApiCall({
          isLoading: false,
          error: err,
        });
      });
  };
  const fetchUserIssuesReported = (id) => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(USER_ISSUES_REPORTED(id))
      .then((res) => {
        setUserIssuesReported(res.data);
        setApiCall({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setApiCall({
          isLoading: false,
          error: err,
        });
      });
  };
  const fetchUserIssuesAssigned = (id) => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(USER_ISSUES_ASSIGNED(id))
      .then((res) => {
        setUserIssuesAssigned(res.data);
        setApiCall({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setApiCall({
          isLoading: false,
          error: err,
        });
      });
  };

  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      fetchUser(id);
    }
  }, [id]);

  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      fetchUserProjects(id);
    }
  }, [id]);
  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      fetchUserIssuesReported(id);
    }
  }, [id]);
  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      fetchUserIssuesAssigned(id);
    }
  }, [id]);

  console.log(user);
  console.log(userProjects);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return user && userProjects && userIssuesAssigned && userIssuesReported && !apiCall.isLoading ? (
    <div className="user-container">
      <div className="user-container-user-info">
        <Avatar src={user.avatar} />
        <div className="user-container-user-info-name">
          <div>{user.name}</div>
          <div>{user.role}</div>
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
          {userProjects.projects.map((project, index) => {
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
          {userIssuesReported.issuesReported.map((issue, index) => {
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
          {userIssuesAssigned.issuesAssigned.map((issue, index) => {
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

export default User;
