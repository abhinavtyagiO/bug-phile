import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import Layout from "./layout";
import "./App.css";
import Header from "./components/header";
import Signin from "./pages/signin";
import axios from "axios";
import { WHO_AM_I } from "./constants/backend-urls";
import { links } from "./constants/frontend-urls";
import BaseRouter from "./routes";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const whoAmI = () => {
    axios
      .get(WHO_AM_I())
      .then((res) => {
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    whoAmI();
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoading ? <CircularProgress /> : <BaseRouter />}
      </div>
    </Router>
  );
};

export default App;
