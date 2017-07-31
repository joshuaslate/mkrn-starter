import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({ user }) => {
  return (
    <div>
      {user && user.user && user.user.firstName}
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }),
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(Header);
