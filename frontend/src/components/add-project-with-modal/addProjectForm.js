import {
  Select,
  TextField,
  Typography,
  MenuItem,
  OutlinedInput,
  Input,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const names = [
  "Michael Scott",
  "Jim Halpert",
  "Dwight Shrute",
  "Pam Beesley",
  "Ryan Howard",
];

const statuses = ["Development", "Testing", "Production"];

const AddProjectForm = () => {
  const [MemberName, setMemberName] = useState([]);
  const [Status, setStatus] = useState();

  const handleEditorChange = (e, editor) => {
    console.log(editor.getData());
  };

  const handleMemberChange = (event) => {
    const {
      target: { value },
    } = event;
    setMemberName(typeof value === "string" ? value.split(",") : value);
  };

  const handleStatusChange = () => {};

  return (
    <div>
      <form>
        <Typography>Name</Typography>
        <TextField name="name" />
        <Typography>Logo</Typography>
        <input type="file" accept="image/*" name="image" />
        <Typography>Description</Typography>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleEditorChange}
        ></CKEditor>
        <Typography>Members</Typography>
        <Select
          multiple
          value={MemberName}
          onChange={handleMemberChange}
          input={<OutlinedInput label="Name" />}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Typography>Status</Typography>
        <Select
          value={Status}
          onChange={handleStatusChange}
          input={<OutlinedInput label="Status" />}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
        <Typography>Link</Typography>
        <TextField name="link" />
        <Button type="submit" variant="contained">
          Add Project
        </Button>
      </form>
    </div>
  );
};

export default AddProjectForm;
