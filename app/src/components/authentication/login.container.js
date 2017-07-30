import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextInput from '../form-fields/text-input';
import Alert from '../notification/alert';
import { login, CHANGE_AUTH } from '../../redux/modules/user';
import { errorPropTypes } from '../../util/proptype-utils';
import './authentication.scss';

const form = reduxForm({
  form: 'login',
});

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
        <Alert errors={errors} icon="error_outline" />
        <Alert message={message} icon="done" />
        <form className="form" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <ul className="form-list">
            <li>
              <Field id="email" name="email" label="Email" component={TextInput} type="email" placeholder="you@yourdomain.com" />
            </li>
            <li>
              <Field id="password" label="Password" name="password" component={TextInput} type="password" placeholder="********" />
            </li>
          </ul>
          <button type="submit" className="button is-primary">Login</button><br />
          <div className="center"><Link className="inline" to="/forgot-password">Forgot password?</Link> | <Link className="inline" to="/register">Create a new account.</Link></div>
        </form>
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
