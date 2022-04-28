import {
  Select,
  Typography,
  MenuItem,
  OutlinedInput,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ISSUE,
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
  USERS,
} from "../../constants/backend-urls";
import { connect } from "react-redux";
import { updateIssues } from "../../store/actions/update-issues";
import { EditIssueDetailsSchema } from "./editIssueDetailsValidation";
import { fetchIssue } from "../../store/actions/issue";

const EditDetailsForm = (props) => {
  const { issueId } = useParams();
  const [data, setData] = useState({
    assignees: [],
    status: null,
    priority: null,
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [issueStatuses, setIssueStatuses] = useState([]);
  const [issuePriorities, setIssuePriorities] = useState([]);
  const csrftoken = Cookies.get("csrftoken");

  console.log(issueId);

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

  useEffect(() => {
    fetchUsers();
    fetchIssueStatuses();
    fetchIssuePriorities();
  }, []);

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
    EditIssueDetailsSchema.validate(data, { abortEarly: false })
      .then(() => {
        setErrors({});
        const formData = new FormData();
        data.priority && formData.append("priority", data.priority);
        data.status && formData.append("status", data.status);

        data.assignees &&
          data.assignees.forEach((item) => {
            formData.append("assignee", JSON.stringify(item));
          });

        axios
          .patch(ISSUE(issueId), formData, {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
          })
          .then((res) => {
            props.fetchIssue(issueId);
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

  return (
    <div>
      <form>
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

        <Typography>Status</Typography>
        <Select
          name="status"
          value={data.status || null}
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
          error={errors.hasOwnProperty("priority") ? true : false}
        >
          <Typography>Priority</Typography>
          <Select
            name="priority"
            value={data.priority || null}
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
          Apply Changes
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issue: state.issue.issue,
    error: state.issue.error,
    isLoading: state.issue.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssue: (issueId) => dispatch(fetchIssue(issueId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDetailsForm);
