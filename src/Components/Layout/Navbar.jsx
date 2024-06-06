import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="bg-danger py-2 px-3 d-flex justify-content-between">
      <h4>
        <i className={`${props.icon} px-1`} />
        {props.title}
      </h4>
      <ul style={{ listStyleType: "none", paddingLeft: "0", color: "Black" }}>
        <li className="px-2">
          <Link to="/" className="px-2">
            Home
          </Link>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
Navbar.defaultProps = {
  title: "Git Finder",
  icon: "fa fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
