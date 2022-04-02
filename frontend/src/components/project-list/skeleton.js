import React from "react";
import { Skeleton } from "@mui/material";

const ProjectListItemSkeleton = () => (
  <div className="project-list-item-skeleton">
    <Skeleton animation="wave" variant="circular" width={55} height={55} />
    <div className="project-list-item-details-skeleton">
      <Skeleton
        animation="wave"
        variant="text"
        height={20}
        width="80%"
        style={{ marginBottom: 6 }}
      />
      <Skeleton animation="wave" height={30} width={70} />
    </div>
  </div>
);

export default ProjectListItemSkeleton;
