import React from "react";
import { Chip } from "@mui/material";

const IssueStatus = (props) => {
  const statusText = props.status.text;
  return <Chip sx={{backgroundColor: "#5D74EF", color: "#ffffff"}} label={statusText} />;
};

export default IssueStatus;
