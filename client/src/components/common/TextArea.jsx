import React, { PropTypes } from 'react';

const TextArea = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += '' + 'has error';
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}> {label} </label>
      <div className="field">
        <textarea
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert-danger">{error}</div>}
      </div>
    </div>

  );
};
TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};
export default TextArea;
