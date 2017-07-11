import React from 'react';
import jwtDecode from 'jwt-decode';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    console.log('propss', this.props);
    return (
      <nav className="nav-wrapper">
        <div id="nav-mobile" className="right hide-on-med-and-down">
          <IndexLink to="/" activeClassName="active">{'Home  | '}</IndexLink>
          {user && user.data.role === 'admin'
            ? <Link to="/user" activeClassName="active">{'User | '}</Link>
            : ''
          }
          {user && user.data.role === 'admin'
            ? <Link to="/document" activeClassName="active">{' All Document  | '}</Link>
            : ''
          }
          {user
            ? <Link to="/document/userdocuments" activeClassName="active">{'My Documents  | '}</Link>
            : ''
          }
          {user
            ? ''
            : <Link to="/user/create" activeClassName="active">{'Sign Up  | '}</Link>
          }
          {user
            ? <Link to={`/user/${user.id}`} activeClassName="active">{user.data.name} </Link>
            : <Link to="/userLogin" activeClassName="active">Login </Link>
          }
          {user
            ? <Link to="#" activeClassName="active" onClick={this.logoutUser}>Logout</Link>
            : null
          }
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
