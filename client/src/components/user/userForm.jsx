import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput.jsx';
import SelectRole from '../common/SelectRole.jsx';
import * as sessionActions from '../../actions/sessionActions.js';


class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const onChange = this.props.onChange;
    const onSave = this.props.onSave;
    const saving = this.props.saving;
    const token = this.props.session.token || localStorage.getItem('jwt');
    const user = token && jwtDecode(token);

    return (
      <form onSubmit={onSave}>
        <h4>Sign Up </h4>
        <TextInput
          name="name"
          label="Name"
          onChange={onChange}
          value={this.props.user ? this.props.user.name : ''}
        />
        <TextInput
          name="email"
          label="Email"
          type="email"
          value={this.props.user ? this.props.user.email : ''}
          onChange={onChange}
        />
        {user && user.data.role === 'admin'
           ? ''
           : <TextInput
             name="password"
             label="password"
             type="password"
             onChange={onChange}
           />
         }
        {user && user.data.role === 'admin'
           ? <SelectRole
             name="role_type"
             label="role_type"
             value={this.props.user ? this.props.user.role_type : ''}
             onChange={onChange}
           />
           : ''
         }
        <input
          type="submit"
          className="waves-effect waves-light btn"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          style={{ marginTop: '10px' }}
          onClick={onSave}
        />
      </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
