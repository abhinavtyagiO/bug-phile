import {
  Select,
  TextField,
  Typography,
  MenuItem,
  OutlinedInput,
  Input,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PROJECT_STATUSES, USERS } from "../../constants/backend-urls";
import { URL_REGEX } from "../../constants/regex";
import { isValidUrl } from "../../utils/regex";
import { AddProjectSchema } from "./validation";

const AddProjectForm = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [MemberName, setMemberName] = useState([]);
  const [Status, setStatus] = useState();
  const [users, setUsers] = useState([]);
  const [projectStatuses, setProjectStatuses] = useState([]);

  const fetchUsers = () => {
    axios
      .get(USERS())
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProjectStatuses = () => {
    axios
      .get(PROJECT_STATUSES())
      .then((res) => {
        setProjectStatuses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchProjectStatuses();
  }, []);

  const handleEditorChange = (e, editor) => {
    setData({
      ...data,
      description: editor.getData(),
    });
  };

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    console.log({ value, name });
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateForm = (e) => {
    e.preventDefault();
    AddProjectSchema.validate(data, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((err) => {
        let errObj = {};
        err.inner.forEach((e) => {
          errObj[e.path] = e.message;
        });
        console.log(errObj);
        setErrors(errObj);
      });
  };

  console.log(data);

  return (
    <div>
      <form>
        <Typography>Name</Typography>
        <TextField
          name="name"
          value={data.name || ""}
          error={errors.hasOwnProperty("name") ? true : false}
          helperText={errors.hasOwnProperty("name") ? errors["name"] : ""}
          onChange={handleChange}
          fullWidth
        />

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
          value={data.members || []}
          onChange={handleChange}
          name="members"
          fullWidth
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>

        <FormControl
          fullWidth
          error={errors.hasOwnProperty("status") ? true : false}
        >
          <Typography>Status</Typography>
          <Select
            name="status"
            value={data.status}
            error={errors.hasOwnProperty("status") ? true : false}
            helperText={errors.hasOwnProperty("status") ? errors["status"] : ""}
            onChange={handleChange}
            fullWidth
          >
            {projectStatuses.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.text}
              </MenuItem>
            ))}
          </Select>
          {errors.hasOwnProperty("status") && (
            <FormHelperText>{errors["status"]}</FormHelperText>
          )}
        </FormControl>

        <Typography>Link</Typography>
        <TextField
          name="link"
          value={data.link || ""}
          error={errors.hasOwnProperty("link") ? true : false}
          helperText={errors.hasOwnProperty("link") ? errors["link"] : ""}
          onChange={handleChange}
          fullWidth
        />

        <Button type="submit" variant="contained" onClick={validateForm}>
          Add Project
        </Button>
      </form>
    </div>
  );
};

export default AddProjectForm;
