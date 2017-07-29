import PropTypes from 'prop-types';

export const errorPropTypes = PropTypes.arrayOf(PropTypes.shape({
  error: PropTypes.string,
}));
