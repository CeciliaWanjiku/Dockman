import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => (
  <nav>
    <IndexLink to="/" activeClassName="active">Home </IndexLink>
    {' | '}
    <Link to="/about" activeClassName="active">About </Link>
    {' | '}
    <Link to="/document" activeClassName="active">Document </Link>
  </nav>
    );

export default Header;
