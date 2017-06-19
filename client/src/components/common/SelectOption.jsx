import React, { PropTypes } from 'react';
const styleVisible = {display: 'block'}
const SelectOption = ({ name, label, onChange, defaultOption, value, error, options }) => (
  <div className="col s12">
    <label htmlFor={name} style={styleVisible}>{label}</label>
    <select
      name={name}
      value={value || 'public'}
      onChange={onChange}
      style={styleVisible}
    >
      <option value="public">Public</option>
      <option value="private">Private</option>
    </select>
    {error && <div className="alert-danger">{error}</div>}
  </div>

    );
SelectOption.PropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};
export default SelectOption;

