import React, { PropTypes } from 'react';
const SelectInput = ({ name, label, onChange, defaultOption, value, error, options }) => (
  <div className="select=form">
    <label htmlFor={name}>{label}</label>
    <div className="field">
      <select
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value=" ">{defaultOption}</option>
        {options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)
        }
      </select>
      {error && <div className="alert-danger">{error}</div>}
    </div>
  </div>

    );
SelectInput.PropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};
export default SelectInput;

