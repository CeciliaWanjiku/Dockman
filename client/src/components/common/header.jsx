import React from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots.jsx';

const Header = () => (
  <nav className="nav-wrapper">
    <div id="nav-mobile" className="right hide-on-med-and-down">
      <IndexLink to="/" activeClassName="active">Home </IndexLink>
      {' | '}
      <Link to="/about" activeClassName="active">About </Link>
      {' | '}
      <Link to="/document" activeClassName="active">Document </Link>
      {' | '}
      <Link to="/user" activeClassName="active">User </Link>
      {' | '}
      <Link to="/userLogin" activeClassName="active">Login </Link>

      <LoadingDots interval={100} dots={20} />
    </div>
  </nav>
    );

export default Header;
