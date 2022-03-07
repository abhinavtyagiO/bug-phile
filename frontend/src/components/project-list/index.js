import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProjectWithModal from "../add-project-with-modal";
import ProjectStatus from "../common/project-status";
import { links } from "../../constants/frontend-urls";
import {
  Button,
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";

import "./styles.css";
import { PROJECTS } from "../../constants/backend-urls";

const ProjectList = (props) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    axios
      .get(PROJECTS())
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log(projects);

  return (
    <div className="projects-list-container">
      <div className="add-project-btn">
        <AddProjectWithModal />
      </div>
      <List>
        {projects.map((project, index) => (
          <div>
            <Link to={links.PROJECT(project.id)}>
              <ListItem button className="project-list-item" key={index}>
                <img className="project-list-item-image" src={project.image} />
                <div className="project-list-item-content">
                  {project.name}
                  <ProjectStatus status={project.status} />
                </div>
              </ListItem>
            </Link>
            {index + 1 < projects.length ? <Divider /> : null}
          </div>
        ))}
      </List>
    </div>
  );
};

export default ProjectList;
