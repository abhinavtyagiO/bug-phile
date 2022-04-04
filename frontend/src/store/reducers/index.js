import { combineReducers } from "redux";
import projects from "./projects";
import issues from "./issues";
import users from "./users";
import projectIssues from "./project-issues";
import project from "./project";
import user from "./user";
import userProjects from "./user-projects";
import userIssuesReported from "./user-issues-reported";
import userIssuesAssigned from "./user-issues-assigned";

export default combineReducers({
  projects,
  issues,
  users,
  projectIssues,
  project,
  user,
  userProjects,
  userIssuesReported,
  userIssuesAssigned,
});
