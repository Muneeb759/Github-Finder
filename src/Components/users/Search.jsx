import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../Context/Github/GithubContext";
import AlertContext from "../../Context/Alert/AlertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");
  // This is used to edit input in search bar

  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert(" Please enter a username", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          className="search px-3"
          value={text} // Controlled component approach
          onChange={onChange} // Capture user input
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block search"
        />
      </form>

      {githubContext.users.length > 0 && (
        <button
          onClick={githubContext.clearUsers}
          className="btn btn-light btn-block my-1 search "
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
