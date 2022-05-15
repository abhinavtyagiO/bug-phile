import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { links, pages } from "../../constants/frontend-urls";
import axios from "axios";
import { USER_ON_LOGOUT } from "../../constants/backend-urls";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import "./styles.css";
import { fetchSearchProject } from "../../store/actions/search-project";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchProject, setSearchProject] = useState("");

  const isMenuOpen = Boolean(anchorEl);
  const csrftoken = Cookies.get("csrftoken");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSearchProject(event.target.value);
  };

  const handleClick = () => {
    props.fetchSearchProject(searchProject);
  };

  const handleLogout = () => {
    axios
      .post(
        USER_ON_LOGOUT(),
        {},
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      )
      .then((res) => {
        window.location.href = "/signin";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={links.USER(props.currentUserId)} className="profile-link">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        position="static"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Toolbar>
          <Link to={pages.DASHBOARD} className="title-link">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={
                ({
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                },
                { color: "#595858" })
              }
            >
              Bugphile
            </Typography>
          </Link>
          <TextField
            value={searchProject}
            label="Search Projects"
            variant="outlined"
            onChange={handleChange}
          />{" "}
          <Button onClick={handleClick}>
            <SearchIcon />
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to={pages.USERS} className="dashboard-button-link">
              <Button
                variant="outlined"
                style={{ color: "#9AA0A6", borderColor: "#9AA0A6" }}
              >
                <div>USERS</div>
              </Button>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle style={{ color: "#F1F3F4" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.currentUserId,
    error: state.auth.error,
    isLoading: state.auth.isLoading,

    projects: state.searchProject.projects,
    error: state.searchProject.error,
    isLoading: state.searchProject.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchProject: (project) => dispatch(fetchSearchProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
