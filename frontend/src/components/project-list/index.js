import * as React from "react";
import AddProjectWithModal from "../add-project-with-modal";
import ProjectStatus from "../common/project-status";
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

const ProjectList = (props) => {
  return (
    <div className="projects-list-container">
      <div className="add-project-btn">
        <AddProjectWithModal />
      </div>
      <List>
        {props.projects.map((project, index) => (
          <div>
            <ListItem button className="project-list-item" key={index}>
              <img className="project-list-item-image" src={project.image} />
              <div className="project-list-item-content">
                {project.name}
                <ProjectStatus status={project.status} />
              </div>
            </ListItem>
            {index+1 != props.projects.length ? <Divider /> : null}
          </div>
        ))}
      </List>
    </div>
  );
};

export default ProjectList;
