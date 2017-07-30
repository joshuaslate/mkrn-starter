import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ input, meta, id, placeholder, type, label = '', extraClasses = '' }) => (
  <label htmlFor={id} className="form-label">
    {label}
    {meta.touched && meta.error && <div className="alert alert-card alert-error">{meta.error}</div>}
    <input
      {...input}
      id={id}
      className={`form-control ${extraClasses}`}
      placeholder={placeholder}
      type={type}
    />
  </label>
);

TextInput.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
  }),
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  extraClasses: PropTypes.string,
};

export default TextInput;
