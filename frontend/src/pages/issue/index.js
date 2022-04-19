import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Divider,
  Avatar,
  CircularProgress,
  Typography,
} from "@mui/material";
import IssueStatus from "../../components/common/issue-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";
import { ISSUE_COMMENTS } from "../../constants/backend-urls";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchIssue } from "../../store/actions/issue";
import { fetchIssueComments } from "../../store/actions/issue-comments";

const Issue = (props) => {
  const { issueId } = useParams();
  const [editorData, setEditorData] = useState();

  const handleEditorChange = (e, editor) => {
    setEditorData(editor.getData());
    console.log(editorData);
  };

  const addComment = () => {};

  useEffect(() => {
    props.fetchIssue(issueId);
    props.fetchIssueComments(issueId);
  }, [issueId]);

  return props.isLoading ? (
    <>
      <CircularProgress />
    </>
  ) : props.error ? (
    <></>
  ) : (
    props.issue && (
      <div className="issue-container">
        <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
          {props.issue.title}
        </Typography>
        <Divider />
        <div className="issue-container-reporter">
          <div className="issue-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              REPORTED BY
            </Typography>
            <div>
              <Link
                to={links.USER(props.issue.reporter.id)}
                className="user-link"
              >
                <UserAvatar user={props.issue.reporter} />
              </Link>
            </div>
          </div>
          <div className="issue-container-info-right">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              CREATED ON
            </Typography>
            <Typography>30/01/2022</Typography>
          </div>
        </div>
        <Divider />
        <div className="issue-container-tags">
          <div className="issue-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              TAGS
            </Typography>
            <div className="issue-container-assignee">
              {props.issue.tags.map((tag, index) => {
                return <IssueTag tag={tag} index={index} />;
              })}
            </div>
          </div>
        </div>
        <Divider />
        <div className="issue-container-reporter">
          <div className="issue-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              STATUS
            </Typography>
            <IssueStatus status={props.issue.status} />
          </div>
          <div className="issue-container-info-right">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              PRIORITY
            </Typography>
            <IssuePriority priority={props.issue.priority} />
          </div>
        </div>
        <Divider />
        <div className="issue-container-reporter">
          <div className="issue-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              ASSIGNEES
            </Typography>
            <div className="issue-container-assignee">
              {props.issue.assignee.map((user, index) => {
                return (
                  <Link to={links.USER(user.id)} className="user-link">
                    <UserAvatar user={user} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <Divider />
        <div className="issue-container-reporter">
          <div className="issue-container-info-left">
            <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
              DESCRIPTION
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: props.issue.description }}
            />
          </div>
        </div>
        <Divider />
        <div className="issue-container-info-left">
          <Typography variant="subtitle2" sx={{ color: "#6C6F72" }}>
            COMMENTS
          </Typography>
          {props.issueComments &&
            props.issueComments.map((comment, index) => {
              return (
                <div className="issue-container-comment-box">
                  <Avatar src={comment.commenterDetails.avatar} />
                  <div className="issue-container-comment-content">
                    <div className="issue-comment-header">
                      <Link
                        to={links.USER(comment.commenter.id)}
                        className="user-link"
                      >
                        <Typography style={{ color: "#000000" }}>
                          {comment.commenterDetails.name}
                          {"   "}
                        </Typography>
                      </Link>
                      <span>
                        <Typography
                          style={{ color: "#595858" }}
                          variant="subtitle2"
                        >
                          {" "}
                          • {moment(comment.timestamp).format("lll")}
                        </Typography>
                      </span>
                    </div>
                    <Typography
                      style={{ color: "#595858" }}
                      dangerouslySetInnerHTML={{ __html: comment.text }}
                      className=""
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <Divider />
        <div className="issue-add-comment-container">
          <div className="issue-container-info-left">
            <Typography
              variant="subtitle2"
              sx={{ color: "#6C6F72", marginBottom: "1rem" }}
            >
              ADD A COMMENT
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              onChange={handleEditorChange}
            ></CKEditor>
          </div>
          <Button
            style={{ marginTop: "1rem" }}
            type="submit"
            variant="contained"
            onClick={addComment}
          >
            Add Comment
          </Button>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    issue: state.issue.issue,
    error: state.issue.error,
    isLoading: state.issue.isLoading,

    issueComments: state.issueComments.issueComments,
    issueCommentsError: state.issueComments.error,
    issueCommentsIsLoading: state.issueComments.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssue: (id) => dispatch(fetchIssue(id)),
    fetchIssueComments: (id) => dispatch(fetchIssueComments(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
