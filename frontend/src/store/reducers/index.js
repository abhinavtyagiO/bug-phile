import { combineReducers } from "redux";
import projects from "./projects";
import issues from "./issues";

export default combineReducers({
  projects,
  issues,
});
