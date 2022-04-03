import { combineReducers } from "redux";
import projects from "./projects";
import issues from "./issues";
import users from "./users";
import projectIssues from "./project-issues";
import project from "./project";

export default combineReducers({
  projects,
  issues,
  users,
  projectIssues,
  project,
});
