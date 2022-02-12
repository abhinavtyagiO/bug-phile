import React from "react";
import { Chip, Avatar } from "@mui/material";

import "./styles.css";

const UserAvatar = () => {
  return (
    <Chip
      label="Mihir Sachdeva"
      variant="outlined"
      className="user-avatar-chip"
      avatar={<Avatar className="user-avatar-avatar">A</Avatar>}
    />
  );
};

export default UserAvatar;
