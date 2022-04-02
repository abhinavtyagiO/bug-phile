import React from "react";
import { Skeleton } from "@mui/material";

const IssueListSkeleton = () => (
  <div className="issue-list-skeleton">
    <Skeleton animation="wave" height={40} width={50} />
    <div className="issue-list-detail-skeleton">
      <Skeleton animation="wave" variant="text" height={20} width="80%" />
      <Skeleton animation="wave" variant="text" height={20} width="30%" />
      <Skeleton animation="wave" height={40} width={50} />
    </div>
  </div>
);

export default IssueListSkeleton;
