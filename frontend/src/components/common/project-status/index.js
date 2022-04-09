import React from "react";
import { Chip } from "@mui/material";

const ProjectStatus = (props) => {
  return (
    <Chip
      // style={{ backgroundColor: props.status.color }}
      label={props.status.text}
      color="primary"
    />
  );
};

export default ProjectStatus;
