import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT,
} from "../Types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search users
  // This function is called from the Search component by passing props up
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res?.data?.items,
    });
  };

  //Get users
  // This function is called from the User item to display user details from Github
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: res?.data,
    });
  };

  //Get repos
  // This function is called from the User.js component to display the latest repos from Github
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&client_id=${
        import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };
  //Clear users
  // This is used to clear the search bar
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //Set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
