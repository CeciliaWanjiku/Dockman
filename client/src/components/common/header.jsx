import React from 'react';
import jwtDecode from 'jwt-decode';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingDots from './LoadingDots.jsx';
import * as sessionActions from '../../actions/sessionActions.js';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.props.actions.logoutUser();
  }

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
            ? <Link to="document/userdocuments" activeClassName="active">My Documents </Link>
            : ''
          }
          {' | '}
          <Link to="/user/create" activeClassName="active">Sign Up </Link>
          {' | '}
          {user
            ? <Link to={`/user/${user.id}`} activeClassName="active">{user.data.name} </Link>
            : <Link to="/userLogin" activeClassName="active">Login </Link>
          }
          {user
            ? <Link to="#" activeClassName="active" onClick={this.logoutUser}>Logout</Link>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
