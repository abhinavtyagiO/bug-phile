import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import ProjectIssueStats from "../../components/project-issue-stats";
import { Divider, CircularProgress, Typography } from "@mui/material";
import ProjectStatus from "../../components/common/project-status";
import UserAvatar from "../../components/common/user-avatar";
import "./styles.css";
import { links } from "../../constants/frontend-urls";
import { fetchProjectIssues } from "../../store/actions/project-issues";
import { fetchProject } from "../../store/actions/project";

const Project = (props) => {
  const { id } = useParams();

  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      props.fetchProject(id);
      props.fetchProjectIssues(id);
    }
  }, [id]);

  return props.isLoading ? (
    <>
      <CircularProgress />
    </>
  ) : props.error ? (
    <>err</>
  ) : (
    props.project && (
      <div className="project-container">
        <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
          {props.project.name}
        </Typography>

        <Divider />

        <div className="project-container-reporter">
          <div className="project-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              CREATED BY
            </Typography>
            <div>
              <Link
                to={links.USER(props.project.creator.id)}
                className="project-creator-link"
              >
                <UserAvatar user={props.project.creator} />
              </Link>
            </div>
          </div>
          <div className="project-container-info-right">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              CREATED ON
            </Typography>
            <Typography>
              {moment(props.project.timestamp).format("L")}
            </Typography>
          </div>
        </div>

        <Divider />

        <div className="project-container-reporter">
          <div className="project-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              STATUS
            </Typography>
            <div>
              <ProjectStatus status={props.project.status} />
            </div>
          </div>
        </div>

        <Divider />

        <div className="project-container-reporter">
          <div className="project-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              MEMBERS
            </Typography>
            <div>
              {props.project.members.map((member, index) => {
                return (
                  <Link
                    to={links.USER(member.id)}
                    className="project-members-link"
                  >
                    <UserAvatar user={member} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Divider />

        <div className="project-container-info-left">
          <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
            DESCRIPTION
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: props.project.description }}
          />
        </div>

        <Divider />

        <div className="project-container-info-left">
          <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
            ISSUE STATS
          </Typography>
          <ProjectIssueStats stats={props.projectIssues} />
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.project.project,
    error: state.project.error,
    isLoading: state.project.isLoading,

    projectIssues: state.projectIssues.projectIssues,
    projectIssuesError: state.projectIssues.error,
    projectIssuesIsLoading: state.projectIssues.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
    fetchProjectIssues: (id) => dispatch(fetchProjectIssues(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
