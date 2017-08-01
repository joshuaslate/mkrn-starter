import PropTypes from 'prop-types';

export const errorPropTypes = PropTypes.arrayOf(PropTypes.shape({
  error: PropTypes.string,
}));

export const fieldPropTypes = {
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
  label: PropTypes.string,
};
