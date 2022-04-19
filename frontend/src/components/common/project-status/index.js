import React from "react";
import { Chip } from "@mui/material";

const ProjectStatus = (props) => {
  return (
    <Chip
      style={{ backgroundColor: "#5D74EF", color: "#ffffff" }}
      label={props.status.text}
    />
  );
};

export default ProjectStatus;
