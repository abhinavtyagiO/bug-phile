import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import { Divider, ListItem, Avatar, CircularProgress } from "@mui/material";
import "./styles.css";
import { fetchUsers } from "../../store/actions/users";
import { connect } from "react-redux";

const UsersList = (props) => {
  useEffect(() => {
    props.fetchUsers();
  }, []);

  return (
    <div className="users-list-container">
      <h3>Users</h3>
      <Divider />
      {props.isLoading ? (
        <>
        <CircularProgress />
        </>
      ) : props.error ? (
        <></>
      ) : (
        props.users.map((user, index) => {
          return (
            <Link to={links.USER(user.id)}>
              <ListItem
                button
                key={index}
                className="users-list-container-user"
              >
                <div className="users-list-container-user-avatar">
                  <Avatar src={user.avatar} />
                  {user.name}
                </div>
                <i>{user.role}</i>
              </ListItem>
            </Link>
          );
        })
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
