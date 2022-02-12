import React from "react";
import { Chip } from "@mui/material";

import "./styles.css";

const IssueTag = () => {
  return (
    <Chip
      label="quality"
      variant="outlined"
      className="issue-tag-chip"
      avatar={<div className="issue-tag-chip-color"></div>}
    />
  );
};

export default IssueTag;
