import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import UserForm from './userForm.jsx';
import toastr from 'toastr';
import _ from 'lodash';

class ManageUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {},
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const userWrapper = nextProps.user;
    console.log('WRAPPER:', userWrapper);
    if (!userWrapper.user && !userWrapper.success) {
      this.setState(prevState => ({
        ...prevState,
        saving: false,
      }));
    } else {
      this.setState({ saving: false });
      console.log('USER:', this.state.user);
      toastr.success('User saved');
      browserHistory.push('/userLogin');
    }
    if (/\/create$/.test(nextProps.location.pathname)) {
      return;
    }
    if (this.props.user.id !== nextProps.user.id) {
      this.setState({ user: Object.assign({}, nextProps.user) });
    }
  }


  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }
  userFormIsValid() {
    let formIsValid = true;
    const errors = {};

    if (this.state.user.name.length < 5) {
      errors.name = 'name must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  validateEmail(email) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }


  updateUser(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      toastr.error('Name should be longer than 5 characters!!');
      return;
    }
    if (!this.validateEmail(this.state.user.email)) {
      toastr.error('Please enter a valid email');
      return;
    }
    this.setState({ saving: true });
    if (/\/create$/.test(this.props.location.pathname)) {
      this.props.actions.createUser(this.state.user);
    } else {
      this.props.actions.updateUser(this.state.user);
      browserHistory.push('/user');
    }
    // this.redirect();
  }
  redirect() {
    this.setState({ saving: false });
    console.log('USER:', this.state.user);
    toastr.success('User saved');
    browserHistory.push('/userLogin');
  }

  deleteUser(event) {
    this.props.actions.deleteUser(this.state.user);
    toastr.success('User deleted Deleted');
    browserHistory.push('/user');
  }


  render() {
    const token = localStorage.getItem('jwt');
    const user = token && jwtDecode(token);
    return (
      <div>
        <UserForm
          onChange={this.updateUserState}
          onSave={this.updateUser}
          user={this.state.user}
          errors={this.state.error}
          saving={this.state.saving}
        />
        {user && user.data.role === 'admin'
       ? <button
         onClick={this.deleteUser}
         className="btn btn-default"
         style={{ backgroundColor: 'red', marginTop: '-50px', marginLeft: '700px' }}
       >
           Delete User
       </button>
       : ''
       }
      </div>
    );
  }
}

ManageUserPage.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const getUserById = (users, userId) => {
  const user = _.find(users, o => o.id === parseInt(userId, 10));
  return user;
};
const mapStateToProps = (state, ownProps) => {
  if (state.users.length <= 1) {
    return {
      user: state.users[0]
    };
  }
  const user = getUserById(state.users, ownProps.params.id);
  return {
    user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
