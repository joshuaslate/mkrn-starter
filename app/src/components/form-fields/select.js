import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../util/proptype-utils';

const Select = ({ input, children, meta, id, placeholder, label = '', extraClasses = '' }) => (
  <label htmlFor={id} className="form-label">
    {label}
    {meta.touched && meta.error && <div className="alert alert-card alert-error">{meta.error}</div>}
    <select
      {...input}
      className={`form-control ${extraClasses && extraClasses}`}
      placeholder={placeholder}
      id={id}
    >
      {children}
    </select>
  </label>
);

Select.propTypes = {
  ...fieldPropTypes,
  children: PropTypes.node,
};

export default Select;
