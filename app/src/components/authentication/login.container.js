import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextInput from '../form-fields/text-input';
import GenericForm from '../form-fields/generic-form';
import { login, CHANGE_AUTH } from '../../redux/modules/user';
import { errorPropTypes } from '../../util/proptype-utils';
import './authentication.scss';

const form = reduxForm({
  form: 'login',
});

const formSpec = [
  { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'you@yourdomain.com', component: TextInput },
  { id: 'password', name: 'password', label: 'Password', type: 'password', placeholder: '********', component: TextInput },
];

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    desiredPath: PropTypes.string,
    login: PropTypes.func,
    errors: errorPropTypes,
    message: PropTypes.string,
  };

  handleFormSubmit = (formProps) => {
    const { desiredPath } = this.props;
    if (desiredPath) {
      this.props.login(formProps, desiredPath);
    } else {
      this.props.login(formProps);
    }
  }

  render = () => {
    const { handleSubmit, errors, message } = this.props;

    return (
      <div className="auth-box">
        <h1>Login</h1>
        <GenericForm onSubmit={handleSubmit(this.handleFormSubmit)} errors={errors} message={message} formSpec={formSpec} submitText="Login" />
        <Link className="inline" to="/forgot-password">Forgot password?</Link> | <Link className="inline" to="/register">Create a new account.</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  errors: user.errors[CHANGE_AUTH],
  message: user.messages[CHANGE_AUTH],
  authenticated: user.authenticated,
  desiredPath: user.desiredPath,
});

export default connect(mapStateToProps, { login })(form(Login));
