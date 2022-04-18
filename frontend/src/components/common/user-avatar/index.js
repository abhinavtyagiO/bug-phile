import React from "react";
import { Chip, Avatar } from "@mui/material";

import "./styles.css";

const UserAvatar = (props) => {
  return (
    <Chip
      label={props.user.name}
      variant="outlined"
      className="user-avatar-chip"
      avatar={
        <Avatar style={{ backgroundColor: "#5d74ef", color: "white"}} className="user-avatar-avatar">
          {props.user.name[0]}
        </Avatar>
      }
    />
  );
};

export default UserAvatar;
