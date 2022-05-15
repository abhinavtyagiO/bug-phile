import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { List, Divider, ListItem, Typography } from "@mui/material";

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

  console.log(props.searchProjectProjects[0]);

  return (
    <div className="projects-list-container">
      <div className="add-project-btn">
        <AddProjectWithModal />
      </div>
      <List className="project-list-scrollable">
        {props.isLoading ? (
          <>
            <ProjectListItemSkeleton />
            <ProjectListItemSkeleton />
            <ProjectListItemSkeleton />
            <ProjectListItemSkeleton />
            <ProjectListItemSkeleton />
            {/* {Array.from(Array(5)).forEach(() => (
            ))} */}
          </>
        ) : props.error ? (
          <></>
        ) : props.searchProjectProjects.length > 0 ? (
          <div>
            <Link
              to={links.PROJECT(props.searchProjectProjects[0].id)}
              className="project-list-item-link"
            >
              <ListItem button className="project-list-item">
                <img
                  className="project-list-item-image"
                  src={props.searchProjectProjects[0].image}
                />
                <div className="project-list-item-content">
                  <Typography style={{ color: "#000000" }}>
                    {props.searchProjectProjects[0].name}
                  </Typography>
                  <ProjectStatus status={props.searchProjectProjects[0].status} />
                </div>
              </ListItem>
            </Link>
          </div>
        ) : (
          props.projects.map((project, index) => (
            <div>
              <Link
                to={links.PROJECT(project.id)}
                className="project-list-item-link"
              >
                <ListItem button className="project-list-item" key={index}>
                  <img
                    className="project-list-item-image"
                    src={project.image}
                  />
                  <div className="project-list-item-content">
                    <Typography style={{ color: "#000000" }}>
                      {project.name}
                    </Typography>
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

    searchProjectProjects: state.searchProject.projects,
    searchProjectError: state.searchProject.error,
    searchProjectIsLoading: state.searchProject.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
