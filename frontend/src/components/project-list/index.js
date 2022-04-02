import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { List, Divider, ListItem } from "@mui/material";

import AddProjectWithModal from "../add-project-with-modal";
import ProjectStatus from "../common/project-status";
import { links } from "../../constants/frontend-urls";
import { fetchProjects } from "../../store/actions/projects";

import "./styles.css";
import ProjectListItemSkeleton from "./skeleton";

const ProjectList = (props) => {
  useEffect(() => {
    props.fetchProjects();
  }, []);

  console.log(props.projects, props.error, props.isLoading);

  return (
    <div className="projects-list-container">
      <div className="add-project-btn">
        <AddProjectWithModal />
      </div>
      <List className="project-list-scrollable">
        {props.isLoading ? (
          <>
            {Array.from(Array(5)).forEach(() => (
              <ProjectListItemSkeleton />
            ))}
          </>
        ) : props.error ? (
          <></>
        ) : (
          props.projects.map((project, index) => (
            <div>
              <Link to={links.PROJECT(project.id)}>
                <ListItem button className="project-list-item" key={index}>
                  <img
                    className="project-list-item-image"
                    src={project.image}
                  />
                  <div className="project-list-item-content">
                    {project.name}
                    <ProjectStatus status={project.status} />
                  </div>
                </ListItem>
              </Link>
              {index + 1 < props.projects.length ? <Divider /> : null}
            </div>
          ))
        )}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    error: state.projects.error,
    isLoading: state.projects.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
