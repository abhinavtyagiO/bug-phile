import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import {
  Divider,
  ListItem,
  Avatar,
  Tab,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
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
import { AddRoleSchema } from "./validation";
import axios from "axios";
import { USER } from "../../constants/backend-urls";
import Cookies from "js-cookie";

const User = (props) => {
  const { id } = useParams();
  const [value, setValue] = useState("1");
  const [data, setData] = useState({
    role: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const csrftoken = Cookies.get("csrftoken");

  const openRoleModal = () => {
    setOpenModal(true);
  };
  const closeRoleModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      props.fetchUser(id);
      props.fetchUserProjects(id);
      props.fetchUserIssuesAssigned(id);
      props.fetchUserIssuesReported(id);
    }
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRoleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };

  const addRole = (e) => {
    e.preventDefault();
    AddRoleSchema.validate(data, { abortEarly: false })
      .then(() => {
        const formData = new FormData();
        data.role && formData.append("role", data.role);

        axios
          .patch(USER(id), formData, {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
          })
          .then((res) => {
            props.fetchUser();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return props.isLoading ? (
    <></>
  ) : props.error ? (
    <></>
  ) : (
    props.user && (
      <div className="user-container">
        <div className="user-container-user-info">
          <Avatar
            style={{ width: "90px", height: "90px" }}
            src={props.user.avatar}
          />
          <div className="user-container-user-info-name">
            <Typography variant="h4">{props.user.name}</Typography>
            <Typography>
              {props.user.role == "" ? (
                <Button onClick={openRoleModal}>Add Role</Button>
              ) : (
                props.user.role
              )}
            </Typography>
            <Dialog open={openModal} onClose={closeRoleModal}>
              <DialogTitle>Add Your Role</DialogTitle>
              <DialogContent>
                <form>
                  <TextField
                    autoFocus
                    name="role"
                    value={data.role || ""}
                    margin="dense"
                    label="Role"
                    onChange={handleRoleChange}
                    fullWidth
                    variant="standard"
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={addRole}>Add</Button>
              </DialogActions>
            </Dialog>
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
            {props.userProjects.projects &&
              props.userProjects.projects.map((project, index) => {
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
            {props.userIssuesReported.issuesReported &&
              props.userIssuesReported.issuesReported.map((issue, index) => {
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
            {props.userIssuesAssigned.issuesAssigned &&
              props.userIssuesAssigned.issuesAssigned.map((issue, index) => {
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
    )
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
