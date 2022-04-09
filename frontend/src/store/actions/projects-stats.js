import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROJECT_STATS } from "../../constants/backend-urls";

export const fetchProjectsStatsStart = () => {
  return {
    type: actionTypes.FETCH_PROJECTS_STATS_START,
  };
};
export const fetchProjectsStatsSuccess = (projectsStats) => {
  return {
    type: actionTypes.FETCH_PROJECTS_STATS_SUCCESS,
    payload: {
      projectsStats: projectsStats,
    },
  };
};
export const fetchProjectsStatsFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECTS_STATS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchProjectsStats = () => {
  return (dispatch) => {
    dispatch(fetchProjectsStatsStart());
    axios
      .get(PROJECT_STATS())
      .then((res) => {
        const projectsStats = res.data;
        dispatch(fetchProjectsStatsSuccess(projectsStats));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchProjectsStatsFail(err));
      });
  };
};
