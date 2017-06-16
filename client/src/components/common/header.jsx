import React from 'react';
import jwtDecode from 'jwt-decode';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import LoadingDots from './LoadingDots.jsx';



class Header extends React.Component {
  render() {
    const token = this.props.session.token || localStorage.getItem('jwt');
    const user = token && jwtDecode(token);
    return (
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
          {user
            ? <Link to={`/user/${user.id}`} activeClassName="active">{user.data.name} </Link>
            : <Link to="/userLogin" activeClassName="active">Login </Link>
          }
          {user
            ? <Link to="#" activeClassName="active" onClick={() => localStorage.removeItem('jwt')}>Logout</Link>
            : null
          }
          <LoadingDots interval={100} dots={20} />
        </div>
      </nav>
    );
  }
    }
function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(mapStateToProps)(Header);
