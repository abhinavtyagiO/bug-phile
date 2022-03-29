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
import Cookies from "js-cookie";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  API_ROOT,
  PROJECTS,
  PROJECT_STATUSES,
  USERS,
} from "../../constants/backend-urls";
import { URL_REGEX } from "../../constants/regex";
import { isValidUrl } from "../../utils/regex";
import { AddProjectSchema } from "./validation";

const AddProjectForm = () => {
  const [data, setData] = useState({
    name: null,
    description: null,
    members: [],
    status: null,
    link: null,
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [projectStatuses, setProjectStatuses] = useState([]);
  const [projectLogo, setProjectLogo] = useState(null);
  const csrftoken = Cookies.get("csrftoken");

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
    console.log(data);
  };

  const handleLogoChange = (event) => {
    console.log(event);
    setProjectLogo(event.target.files[0]);
  };

  const validateForm = (e) => {
    e.preventDefault();
    AddProjectSchema.validate(data, { abortEarly: false })
      .then(() => {
        setErrors({});
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("status", data.status);
        projectLogo && formData.append("image", projectLogo);
        data.link && formData.append("link", data.link);
        data.description && formData.append("description", data.description);

        data.members.forEach((item) => {
          formData.append("members", JSON.stringify(item));
        });

        axios
          .post(PROJECTS(), formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": csrftoken,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        let errObj = {};
        console.log(err);
        err.inner.forEach((e) => {
          errObj[e.path] = e.message;
        });
        console.log(errObj);
        setErrors(errObj);
      });
  };

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
        <FormControl>
          <Typography>Logo</Typography>

          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleLogoChange}
          />
          {/* {errors.hasOwnProperty("logo") && (
            <FormHelperText>{errors["logo"]}</FormHelperText>
          )} */}
        </FormControl>

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
            value={data.status || []}
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
