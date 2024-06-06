import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = ({ user: { login, html_url, avatar_url, id } }) => {
  return (
    <div
      className="card"
      style={{ textAlign: "center", display: "flex", alignItems: "center" }}
    >
      <img
        src={avatar_url}
        alt="Profile"
        className="round-img my-2"
        style={{
          width: "60px",
          borderRadius: "70px",
        }}
      />
      <h3>{login}</h3>
      <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-2">
        Profile
      </Link>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserItem;
