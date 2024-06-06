import React, { Fragment, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import GithubContext from "../../Context/Github/GithubContext";

const User = ({ hireable }) => {
  const { login } = useParams();
  const githubContext = useContext(GithubContext);

  const { getUser, getUserRepos, user, repos, loading } = githubContext;
  useEffect(() => {
    getUser(login);
    getUserRepos(login);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-dark m-2">
        Back to Search results
      </Link>
      Hireable:{" "}
      {user.hireable ? (
        <i className="fas fa-check text-success"></i>
      ) : (
        <i className="fas fa-times-circle text-danger"></i>
      )}
      <div className="user-info flex justify-center items-center text-center">
        <img
          src={user.avatar_url}
          alt="Profile Picture"
          className="rounded-circle img-2"
          style={{ width: "150px" }}
        />
        <div className="ml-4">
          <h1>{githubContext.user.name}</h1>
          {user.location && (
            <Fragment>
              <h6>Location: {user.location}</h6>
            </Fragment>
          )}
          {user.bio && (
            <Fragment>
              <h6>Bio: {user.bio}</h6>
            </Fragment>
          )}
        </div>
      </div>
      <div className="stats flex justify-between my-2 text-center">
        <div className="badge text-bg-primary m-2">
          Followers: {user.followers}
        </div>
        <div className="badge text-bg-success m-2">
          Following: {user.following}
        </div>
        <div className="badge text-bg-dark m-2">
          Public Repos: {user.public_repos}
        </div>
        <div className="badge text-bg-secondary m-2">
          Public Gists: {user.public_gists}
        </div>
      </div>
      {user.company && (
        <Fragment>
          <h6 className="mt-2 text-center">Company: {user.company}</h6>
        </Fragment>
      )}
      <div className="text-center">
        <a
          href={user.html_url}
          target="_blank"
          className="btn btn-dark my-1 text-center"
          rel="noopener noreferrer"
        >
          Profile
        </a>
      </div>
      <div className="repos">
        <h3>Latest Repos</h3>
        {repos?.map((repo) => (
          <div key={repo.id} className="repo bg-light p-1 my-1">
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default User;
