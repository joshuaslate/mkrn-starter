import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postAuthPath } from '../../redux/modules/user';

export default (ComposedComponent) => {
  return class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.shape({
        history: PropTypes.shape({
          push: PropTypes.func,
        }),
      }).isRequired,
    };

    static propTypes = {
      authenticated: PropTypes.bool,
      location: PropTypes.object,
      route: PropTypes.object,
      postAuthPath: PropTypes.func,
    };

    componentDidMount = () => this.ensureAuthentication(this.props.authenticated);

    componentWillUpdate = nextProps => this.ensureAuthentication(nextProps.authenticated);

    ensureAuthentication = (isAuthed) => {
      if (!isAuthed) {
        if (this.props.route && this.props.route.path) {
          // this.props.postAuthPath(this.props.location.pathname);
        }
        // this.context.router.history.push('/login');
      }
    }

    render() {
      console.log(this.context);
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ user }) => ({ authenticated: user.authenticated });

  return connect(mapStateToProps, { postAuthPath })(Authentication);
}
