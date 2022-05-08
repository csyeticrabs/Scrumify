import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const MyNav = (props) => {
  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <Link to="/" class="navbar-brand">
            Home
          </Link>
          <Link to="/mytask" className="btn btn-primary">
            My Tasks
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default MyNav;
