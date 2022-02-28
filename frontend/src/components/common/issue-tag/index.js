import React from "react";
import { Chip } from "@mui/material";

import "./styles.css";

const IssueTag = (props) => {
  const { tag, index } = props;
  console.log(tag.name);
  return (
    <Chip
      label={tag.name}
      variant="outlined"
      className="issue-tag-chip"
      avatar={<div className="issue-tag-chip-color"></div>}
    />
  );
};

export default IssueTag;
