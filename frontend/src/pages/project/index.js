import * as React from "react";
import { Link } from "react-router-dom";
import { projectStatsList } from "../../mocks";
import ProjectStats from "../../components/project-stats";
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
import ProjectStatus from "../../components/common/project-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";
import { projectData } from "../../mocks/";
import { links } from "../../constants/frontend-urls";

const Project = () => {
  return (
    <div className="project-container">
      <h3>{projectData.name}</h3>
      <Divider />
      <div className="project-container-reporter">
        <div className="project-container-info-left">
          <div>CREATED BY</div>
          <div>
            <Link to={links.USER(projectData.creator.id)}>
              <UserAvatar user={projectData.creator} />
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
            <ProjectStatus status={projectData.status} />
          </div>
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>MEMBERS</div>
        <div>
          {projectData.members.map((member, index) => {
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
        <div dangerouslySetInnerHTML={{ __html: projectData.description }} />
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>ISSUE STATS</div>
        <ProjectStats stats={projectStatsList} />
      </div>
    </div>
  );
};

export default Project;
