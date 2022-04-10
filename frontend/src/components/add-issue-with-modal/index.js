import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import AddIcon from "@mui/icons-material/Add";
import AddIssueForm from "./addIssueForm";

const AddIssueWithModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        style={{ color: "#9AA0A6", borderColor: "#9AA0A6" }}
      >
        ADD ISSUE
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report Issue</DialogTitle>
        <DialogContent>
          <AddIssueForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddIssueWithModal;
