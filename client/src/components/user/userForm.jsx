import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput.jsx';
import SelectInput from '../common/SelectInput.jsx';
import TextArea from '../common/TextArea.jsx';
import SelectOption from '../common/SelectOption.jsx';
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
    console.log('User>>>>', user);
    
    return (
      <form onSubmit={onSave}>
        <h4>Sign Up </h4>
        <TextInput
          name="name"
          label="Name"
          onChange={onChange}
        />
        <TextInput
          name="email"
          label="Email"
          onChange={onChange}
        />
        <TextInput
          name="password"
          label="password"
          type="password"
          onChange={onChange}
        />
        {user && user.data.role === 'admin'
           ? <TextInput
             name="role_type"
             label="role_type"
             onChange={onChange}
           />
           : ''
         }
        <input
          type="submit"
          className="waves-effect waves-light btn"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
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
