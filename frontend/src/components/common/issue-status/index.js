import React from "react";
import { Chip } from "@mui/material";

const IssueStatus = (props) => {
  const statusText = props.status.text;
  return <Chip label={statusText} />;
};

export default IssueStatus;
