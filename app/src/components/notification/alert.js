import React from 'react';
import PropTypes from 'prop-types';
import { errorPropTypes } from '../../util/proptype-utils';

const Alert = ({ errors = [], message = '', icon }) => {
  if (errors && errors.length) {
    return (
      <div className={errors && errors.length ? 'alert alert-card alert-error' : 'is-hidden'}>
        <div className="error"><i className="material-icons">{icon}</i>
          {(errors && errors.length) &&
            errors.map((error, index) => <span key={index}>{error.error}&nbsp;</span>)
          }
        </div>
      </div>
    );
  }
  return (
    <div className={message ? 'alert alert-card alert-message' : 'is-hidden'}>
      <div className="message"><i className="material-icons">{icon}</i>
        <span>{message}</span>
      </div>
    </div>
  );
};

Alert.propTypes = {
  errors: errorPropTypes,
  icon: PropTypes.string,
  message: PropTypes.string,
};

export default Alert;
