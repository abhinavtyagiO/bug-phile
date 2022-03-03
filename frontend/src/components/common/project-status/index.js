import React from "react";
import { Chip } from "@mui/material";

const ProjectStatus = (props) => {
  return <Chip label={props.status.text} />;
};

export default ProjectStatus;
