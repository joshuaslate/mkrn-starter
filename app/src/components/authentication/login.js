import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextInput from '../form-fields/text-input';
import GenericForm from '../form-fields/generic-form';
import { login, CHANGE_AUTH } from '../../redux/modules/authentication';
import { errorPropTypes } from '../../util/proptype-utils';
import './authentication.scss';
import { getComponentTranslator } from '../../util/i18n';
import { Translate } from 'react-i18nify';

const translate = getComponentTranslator('login');

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
    loading: PropTypes.bool,
  };

  static formSpec = [
    { id: 'email', name: 'email', label: translate('email'), type: 'email', placeholder: 'you@yourdomain.com', component: TextInput },
    { id: 'password', name: 'password', label: translate('password'), type: 'password', placeholder: '********', component: TextInput },
  ];

  handleFormSubmit = (formProps) => {
    const { desiredPath } = this.props;
    if (desiredPath) {
      this.props.login(formProps, desiredPath);
    } else {
      this.props.login(formProps);
    }
  }

  render = () => {
    const { handleSubmit, errors, message, loading } = this.props;

    return (
      <div className={`auth-box ${loading ? 'is-loading' : ''}`}>
        <h1><Translate value="login.title"/></h1>
        <GenericForm
          onSubmit={handleSubmit(this.handleFormSubmit)}
          errors={errors}
          message={message}
          formSpec={Login.formSpec}
          submitText={translate('submit')}
        />
        <Link className="inline" to="/forgot-password">
          <Translate value="login.forgotPassword" /></Link> | <Link className="inline" to="/register">
          <Translate value="login.createNewAccount" />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  errors: authentication.errors[CHANGE_AUTH],
  message: authentication.messages[CHANGE_AUTH],
  loading: authentication.loading[CHANGE_AUTH],
  authenticated: authentication.authenticated,
  desiredPath: authentication.desiredPath,
});

export default connect(mapStateToProps, { login })(form(Login));
