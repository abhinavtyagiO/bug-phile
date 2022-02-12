import * as React from "react";
import {
  Button,
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";

import "./styles.css";

const ProjectList = () => {
  return (
    <div className="projects-list-container">
      <div className="add-project-btn">
        <Button variant="outlined" startIcon={<AddIcon />}>
          ADD PROJECT
        </Button>
      </div>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProjectList;
