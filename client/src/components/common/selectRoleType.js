import React, { PropTypes } from 'react';
const styleVisible = { display: 'block' };
const SelectRoleType = ({ name, label, onChange, defaultOption, value, error, options }) => (
  <div className="col s12">
    <label htmlFor={name} style={styleVisible}>{label}</label>
    <select
      name={name}
      value={value || 'viewer'}
      onChange={onChange}
      style={styleVisible}
    >
      <option value="viewer">Viewer</option>
      <option value="editor">Editor</option>
    </select>
    {error && <div className="alert-danger">{error}</div>}
  </div>

    );
SelectRoleType.PropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};
export default SelectRoleType;

