import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projectStatsList } from "../../mocks";
import ProjectIssueStats from "../../components/project-issue-stats";
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
  CircularProgress,
} from "@mui/material";
import ProjectStatus from "../../components/common/project-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";
import { projectData } from "../../mocks/";
import { links } from "../../constants/frontend-urls";
import { PROJECT, PROJECT_ISSUES } from "../../constants/backend-urls";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [projectIssues, setProjectIssues] = useState();
  const [apiCall, setApiCall] = useState({
    isLoading: false,
    error: false,
  });

  const fetchProject = (id) => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(PROJECT(id))
      .then((res) => {
        setProject(res.data);
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

  const fetchProjectIssues = (id) => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(PROJECT_ISSUES(id))
      .then((res) => {
        setProjectIssues(res.data);
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
      fetchProject(id);
    }
  }, [id]);

  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      fetchProjectIssues(id);
    }
  }, [id]);

  console.log(projectIssues);

  return !apiCall.isLoading && project && projectIssues ? (
    <div className="project-container">
      <h3>{project.name}</h3>
      <Divider />
      <div className="project-container-reporter">
        <div className="project-container-info-left">
          <div>CREATED BY</div>
          <div>
            <Link to={links.USER(project.creator.id)}>
              <UserAvatar user={project.creator} />
            </Link>
          </div>
        </div>
        <div className="project-container-info-right">
          <div>CREATED ON</div>
          <div>30/01/2022</div>
        </div>
      </div>
      <Divider />
      <div className="project-container-reporter">
        <div className="project-container-info-left">
          <div>STATUS</div>
          <div>
            <ProjectStatus status={project.status} />
          </div>
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>MEMBERS</div>
        <div>
          {project.members.map((member, index) => {
            return (
              <Link to={links.USER(member.id)}>
                <UserAvatar user={member} />
              </Link>
            );
          })}
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>DESCRIPTION</div>
        <div dangerouslySetInnerHTML={{ __html: project.description }} />
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>ISSUE STATS</div>
        <ProjectIssueStats stats={projectIssues} />
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Project;
