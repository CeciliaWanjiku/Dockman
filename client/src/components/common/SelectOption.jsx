import React, { PropTypes } from 'react';
const SelectOption = ({ name, label, onChange, defaultOption, value, error, options }) => (
  <div className="select=form">
    <label htmlFor={name}>{label}</label>
    <div className="field">
      <select
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value=" ">Public</option>
        <option value=" ">Private</option>
      </select>
      {error && <div className="alert-danger">{error}</div>}
    </div>
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

