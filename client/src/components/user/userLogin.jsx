import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput.jsx';
import * as sessionActions from '../../actions/sessionActions.js';
import toastr from 'toastr';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { credentials: { email: '', password: '' } };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value.trim();
    return this.setState({ credentials });
  }
  userFormIsValid() {
   let formIsValid = true;
   const errors = {};

   if (this.state.credentials.length < 2) {
      errors.name = 'Please enter a valid username and passoword';
      formIsValid = false;
    }
 }
  onSave(event) {
    event.preventDefault();
    // if (!this.userFormIsValid()) {
    //   toastr.error('Please enter a valid username and passoword');
    //   return;
    // }
    this.props.actions.loginUser(this.state.credentials);
  }

  render() {
    return (
      <div>
        <form>
          <TextInput
            name="email"
            label="email"
            className="email"
            value={this.state.credentials.email}
            onChange={this.onChange}
          />

          <TextInput
            name="password"
            label="password"
            type="password"
            className="password"
            value={this.state.credentials.password}
            onChange={this.onChange}
          />

          <input
            type="submit"
            className="btn btn-primary"
            onClick={this.onSave}
          />
          {' '}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});
export default connect(null, mapDispatchToProps)(LogInPage);
