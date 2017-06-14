import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
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

  updateUser(event) {
    event.preventDefault();
    this.setState({ saving: true });
    if (/\/create$/.test(this.props.location.pathname)) {
      this.props.actions.createUser(this.state.user);
    } else {
      this.props.actions.updateUser(this.state.user);
    }
    this.redirect();
  }
  redirect() {
    this.setState({ saving: false });
    toastr.success('User saved');
    browserHistory.push('/user');
  }

  deleteUser(event) {
    this.props.actions.deleteUser(this.state.user);
  }


  render() {
    return (
      <div>
        <UserForm
          onChange={this.updateUserState}
          onSave={this.updateUser}
          user={this.state.user}
          errors={this.state.error}
          saving={this.state.saving}
        />
        <button
          onClick={this.deleteUser}
          className="btn btn-default"
        >
           Delete User
       </button>
      </div>
    );
  }
}

ManageUserPage.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getUserById(users, userId) {
  const user = _.find(users, o => o.id === parseInt(userId, 10));
  return user;
}
const mapStateToProps = (state, ownProps) => {
  const user = getUserById(state.users, ownProps.params.id);
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
