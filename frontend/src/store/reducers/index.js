import { combineReducers } from "redux";
import projects from "./projects";
import issues from "./issues";
import users from "./users";

export default combineReducers({
  projects,
  issues,
  users,
});
