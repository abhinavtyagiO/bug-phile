import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Divider, Avatar, CircularProgress } from "@mui/material";
import IssueStatus from "../../components/common/issue-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";
import { COMMENTS } from "../../constants/backend-urls";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchIssue } from "../../store/actions/issue";

const Issue = (props) => {
  const { issueId } = useParams();
  const [comments, setComments] = useState();
  const [apiCall, setApiCall] = useState({
    isLoading: false,
    error: false,
  });
  const [editorData, setEditorData] = useState();

  const fetchComments = (issueId) => {
    axios
      .get(COMMENTS())
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditorChange = (e, editor) => {
    setEditorData(editor.getData());
    console.log(editorData);
  };

  const addComment = () => {};

  useEffect(() => {
    props.fetchIssue(issueId);
  }, [issueId]);

  useEffect(() => {
    fetchComments(issueId);
  }, []);

  return !apiCall.isLoading && props.issue && comments ? (
    <div className="issue-container">
      <h3>{props.issue.title}</h3>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>REPORTED BY</div>
          <div>
            <Link to={links.USER(props.issue.reporter.id)}>
              <UserAvatar user={props.issue.reporter} />
            </Link>
          </div>
        </div>
        <div className="issue-container-info-right">
          <div>CREATED ON</div>
          <div>30/01/2022</div>
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>TAGS</div>
        <div className="issue-container-assignee">
          {props.issue.tags.map((tag, index) => {
            return <IssueTag tag={tag} index={index} />;
          })}
        </div>
      </div>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>STATUS</div>
          <IssueStatus status={props.issue.status} />
        </div>
        <div className="issue-container-info-right">
          <div>PRIORITY</div>
          <IssuePriority priority={props.issue.priority} />
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>ASSIGNEES</div>
        <div className="issue-container-assignee">
          {props.issue.assignee.map((user, index) => {
            return (
              <Link to={links.USER(user.id)}>
                <UserAvatar user={user} />
              </Link>
            );
          })}
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>DESCRIPTION</div>
        <div dangerouslySetInnerHTML={{ __html: props.issue.description }} />
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>COMMENTS</div>
        {comments.map((comment, index) => {
          return (
            <div className="issue-container-comment-box">
              <Avatar src={comment.commenterDetails.avatar} />
              <div className="issue-container-comment-content">
                <div className="">
                  <Link to={links.USER(comment.commenter)}>
                    {comment.commenterDetails.name}
                  </Link>
                  <span>• {comment.timestamp}</span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                  className=""
                />
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>ADD A COMMENT</div>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleEditorChange}
        ></CKEditor>
      </div>
      <Button type="submit" variant="contained" onClick={addComment}>
        Add Issue
      </Button>
    </div>
  ) : (
    <CircularProgress />
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
    fetchIssue: (id) => dispatch(fetchIssue(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
