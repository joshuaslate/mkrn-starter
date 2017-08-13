import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthenticatedUser } from '../../redux/modules/user';
import { logoutUser } from '../../redux/modules/authentication';
import { mobileBreakpoint } from '../../constants/ui-constants';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: this.mobileCheck(),
    };
  }

  componentWillMount = () => {
    window.addEventListener('resize', this.mobileCheck());
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.mobileCheck());
  }

  mobileCheck = () => window.innerWidth <= mobileBreakpoint;

  buildNavigation = () => {
    const links = [
      {
        name: 'Dashboard',
        link: 'dashboard',
        authenticated: true,
      },
      {
        name: 'Sign out',
        onClick: this.props.logoutUser,
        authenticated: true,
      },
      {
        name: 'Sign in',
        link: 'login',
        authenticated: false,
      },
      {
        name: 'Register',
        link: 'register',
        authenticated: false,
      },
    ];

    return (
      <ul>
        {links.filter(link => link.authenticated === this.props.authenticated).map(link => (
          <li key={link.name}>
            {link.link && <Link to={link.link}>{link.name}</Link>}
            {link.onClick && <a href="javascript:void(null);" onClick={link.onClick}>{link.name}</a>}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { authenticated, user } = this.props;
    return (
      <header className="clearfix">
        <strong className="logo left">MKRN Starter</strong>
        <nav className="main-navigation right">
          <ul>
            {this.buildNavigation()}
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }),
  authenticated: PropTypes.bool,
  logoutUser: PropTypes.func,
};

const mapStateToProps = ({ user, authentication }) => ({
  user: getAuthenticatedUser({ user, authentication }),
  authenticated: authentication.authenticated,
});
export default connect(mapStateToProps, { logoutUser })(Header);
