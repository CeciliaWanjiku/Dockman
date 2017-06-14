import React from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots.jsx';

const Header = () => (
  <nav>
    <IndexLink to="/" activeClassName="active">Home </IndexLink>
    {' | '}
    <Link to="/about" activeClassName="active">About </Link>
    {' | '}
    <Link to="/document" activeClassName="active">Document </Link>
    {' | '}
    <Link to="/user" activeClassName="active">User </Link>


    <LoadingDots interval={100} dots={20} />
  </nav>
    );

export default Header;
