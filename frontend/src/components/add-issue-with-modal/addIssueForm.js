import {
  Select,
  TextField,
  Typography,
  MenuItem,
  OutlinedInput,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ISSUES,
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
  ISSUE_TAGS,
  PROJECTS,
  USERS,
} from "../../constants/backend-urls";
import { AddIssueSchema } from "./validation";
import { connect } from "react-redux";
import { updateIssues } from "../../store/actions/update-issues";

const AddIssueForm = (props) => {
  const { id: projectId } = useParams();
  const [data, setData] = useState({
    title: null,
    description: null,
    assignees: [],
    tags: [],
    status: null,
    priority: null,
    project: null,
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [issueStatuses, setIssueStatuses] = useState([]);
  const [issuePriorities, setIssuePriorities] = useState([]);
  const [issueTags, setIssueTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const csrftoken = Cookies.get("csrftoken");

  console.log(projectId);

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

  const fetchIssueStatuses = () => {
    axios
      .get(ISSUE_STATUSES())
      .then((res) => {
        setIssueStatuses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchIssuePriorities = () => {
    axios
      .get(ISSUE_PRIORITIES())
      .then((res) => {
        setIssuePriorities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchIssueTags = () => {
    axios
      .get(ISSUE_TAGS())
      .then((res) => {
        setIssueTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchProjects = () => {
    axios
      .get(PROJECTS())
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchIssueStatuses();
    fetchIssuePriorities();
    fetchIssueTags();
    fetchProjects();
  }, []);

  console.log(projects);

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

  const handleEditorChange = (e, editor) => {
    setData({
      description: editor.getData(),
    });
  };

  const validateForm = (e) => {
    e.preventDefault();
    AddIssueSchema.validate(data, { abortEarly: false })
      .then(() => {
        setErrors({});
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("priority", data.priority);

        data.description && formData.append("description", data.description);
        data.status && formData.append("status", data.status);
        data.project && formData.append("project", data.project);

        data.assignees &&
          data.assignees.forEach((item) => {
            formData.append("assignee", JSON.stringify(item));
          });
        data.tags.forEach((item) => {
          formData.append("tags", JSON.stringify(item));
        });

        axios
          .post(ISSUES(), formData, {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
          })
          .then((res) => {
            props.updateIssues();
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
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
        <Typography>Title</Typography>
        <TextField
          name="title"
          value={data.title || ""}
          onChange={handleChange}
          error={errors.hasOwnProperty("title") ? true : false}
          helperText={errors.hasOwnProperty("title") ? errors["title"] : ""}
          fullWidth
        />
        <Typography>Description</Typography>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleEditorChange}
        ></CKEditor>
        <Typography>Assign To</Typography>
        <Select
          multiple
          name="assignees"
          value={data.assignees || []}
          onChange={handleChange}
          name="assignees"
          fullWidth
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>

        <Typography>Project</Typography>
        <Select
          name="project"
          value={data.project || []}
          onChange={handleChange}
          input={<OutlinedInput label="project" />}
          fullWidth
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>

        <Typography>Status</Typography>
        <Select
          name="status"
          value={data.status || []}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
          fullWidth
        >
          {issueStatuses.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.text}
            </MenuItem>
          ))}
        </Select>

        <FormControl
          fullWidth
          error={errors.hasOwnProperty("tags") ? true : false}
        >
          <Typography>Tags</Typography>
          <Select
            multiple
            name="tags"
            value={data.tags || []}
            helperText={errors.hasOwnProperty("tags") ? errors["tags"] : ""}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            fullWidth
          >
            {issueTags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
          {errors.hasOwnProperty("tags") && (
            <FormHelperText>{errors["tags"]}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          error={errors.hasOwnProperty("priority") ? true : false}
        >
          <Typography>Priority</Typography>
          <Select
            name="priority"
            value={data.priority || []}
            onChange={handleChange}
            helperText={
              errors.hasOwnProperty("priority") ? errors["priority"] : ""
            }
            input={<OutlinedInput label="Priority" />}
          >
            {issuePriorities.map((priority) => (
              <MenuItem key={priority.id} value={priority.id}>
                {priority.text}
              </MenuItem>
            ))}
          </Select>
          {errors.hasOwnProperty("priority") && (
            <FormHelperText>{errors["priority"]}</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" onClick={validateForm}>
          Add Issue
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.updateIssues.issues,
    error: state.updateIssues.error,
    isLoading: state.updateIssues.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateIssues: () => dispatch(updateIssues()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddIssueForm);
