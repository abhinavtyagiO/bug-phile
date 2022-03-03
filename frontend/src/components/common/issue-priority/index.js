import React from "react";
import { Chip } from "@mui/material";

const IssuePriority = (props) => {
  return <Chip label={props.priority.text} />;
};

export default IssuePriority;
