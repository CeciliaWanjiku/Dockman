import React from 'react';
import TextInput from '../common/TextInput.jsx';
import SelectInput from '../common/SelectInput.jsx';
import TextArea from '../common/TextArea.jsx';
import SelectOption from '../common/SelectOption.jsx';


const UserForm = ({ user, email, onSave, onChange, saving, errors }) => (
  <form onSubmit={onSave}>
    <h1> Manage User </h1>
    <TextInput
      name="name"
      label="Name"
      value={user.name}
      onChange={onChange}

    />
    <TextInput
      name="email"
      label="Email"
      value={user.email}
      onChange={onChange}
    />
    <TextInput
      name="password"
      label="password"
      value={user.password}
      onChange={onChange}
    />
    <input
      type="submit"
      disabled={saving}
      value={saving ? 'Saving...' : 'Save'}
      onClick={onSave}
    />
  </form>
  );
UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  email:React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.isRequired,
  saving: React.PropTypes.bool
  // errors: React.PropTypes.object
};
export default UserForm;
