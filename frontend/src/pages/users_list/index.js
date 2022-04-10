import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import {
  Divider,
  ListItem,
  Avatar,
  CircularProgress,
  Typography,
} from "@mui/material";
import "./styles.css";
import { fetchUsers } from "../../store/actions/users";
import { connect } from "react-redux";

const UsersList = (props) => {
  useEffect(() => {
    props.fetchUsers();
  }, []);

  return (
    <div className="users-list">
      <Typography style={{ margin: "1rem" }} variant="h4">
        USERS
      </Typography>
      <Divider />
      {props.isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : props.error ? (
        <></>
      ) : (
        <div className="user-list-container">
          {props.users.map((user, index) => {
            return (
              <Link to={links.USER(user.id)} className="users-list-link">
                <ListItem
                  button
                  key={index}
                  className="users-list-container-user"
                >
                  <div className="users-list-container-user-avatar">
                    <Avatar src={user.avatar} />
                    <Typography
                      className="users-list-user-name"
                      style={{ color: "#6C6F72" }}
                    >
                      {" "}
                      {user.name}
                    </Typography>
                  </div>
                  <Typography style={{ color: "#6C6F72" }}>
                    <i>{user.role}</i>
                  </Typography>
                </ListItem>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    error: state.users.error,
    isLoading: state.users.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
