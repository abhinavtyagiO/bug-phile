import React from "react";
import { Chip } from "@mui/material";

const IssuePriority = (props) => {
  return <Chip style={{backgroundColor: props.priority.color, color: "white"}} label={props.priority.text} />;
};

export default IssuePriority;
