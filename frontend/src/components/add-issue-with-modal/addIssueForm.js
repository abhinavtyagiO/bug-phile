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

const priorities = [
    'high',
    'moderate',
    'low',
]

const tags = [
    'quality',
    'UI-UX',
    'feature-request',
    'bug',
];

const statuses = ["pending", "resolved", "rejected", "closed"];

const AddIssueForm = () => {
  const [TagName, setTagName] = useState([]);
  const [Status, setStatus] = useState();
  const [Priority, setPriority] = useState();

  const handleEditorChange = (e, editor) => {
    console.log(editor.getData());
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(typeof value === "string" ? value.split(",") : value);
  };

  const handleStatusChange = () => {};
  const handlePriorityChange = () => {};

  return (
    <div>
      <form>
        <Typography>Title</Typography>
        <TextField name="name" />
        <Typography>Description</Typography>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleEditorChange}
        ></CKEditor>
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

        <Typography>Tags</Typography>
        <Select
          multiple
          value={TagName}
          onChange={handleTagChange}
          input={<OutlinedInput label="Tag" />}
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
        <Typography>Priority</Typography>
        <Select
          value={Priority}
          onChange={handlePriorityChange}
          input={<OutlinedInput label="Priority" />}
        >
          {priorities.map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained">
          Add Issue
        </Button>
      </form>
    </div>
  );
};

export default AddIssueForm;
