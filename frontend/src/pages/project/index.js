import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectIssueStats from "../../components/project-issue-stats";
import { Divider, CircularProgress } from "@mui/material";
import ProjectStatus from "../../components/common/project-status";
import UserAvatar from "../../components/common/user-avatar";
import "./styles.css";
import { links } from "../../constants/frontend-urls";
import { connect } from "react-redux";
import { fetchProjectIssues } from "../../store/actions/project-issues";
import { fetchProject } from "../../store/actions/project";

const Project = (props) => {
  const { id } = useParams();
  console.log(id);

  //error here, maybe
  useEffect(() => {
    if (Number.isInteger(parseInt(id))) {
      //even log is not showing
      console.log("running");
      props.fetchProject(id);
      props.fetchProjectIssues(id);
    }
  }, [id]);

  return props.project && props.projectIssues ? (
    <div className="project-container">
      <h3>{props.project.name}</h3>
      <Divider />
      <div className="project-container-reporter">
        <div className="project-container-info-left">
          <div>CREATED BY</div>
          <div>
            <Link to={links.USER(props.project.creator.id)}>
              <UserAvatar user={props.project.creator} />
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
            <ProjectStatus status={props.project.status} />
          </div>
        </div>
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>MEMBERS</div>
        <div>
          {props.project.members.map((member, index) => {
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
        <div dangerouslySetInnerHTML={{ __html: props.project.description }} />
      </div>
      <Divider />
      <div className="project-container-info-left">
        <div>ISSUE STATS</div>
        <ProjectIssueStats stats={props.projectIssues} />
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.project.project,
    projectError: state.project.error,
    projectIsLoading: state.project.isLoading,

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
