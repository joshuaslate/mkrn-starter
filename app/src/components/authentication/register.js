import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextInput from '../form-fields/text-input';
import GenericForm from '../form-fields/generic-form';
import { register, CHANGE_AUTH } from '../../redux/modules/authentication';
import { errorPropTypes } from '../../util/proptype-utils';
import './authentication.scss';
import { getComponentTranslator } from '../../util/i18n';
import { Translate } from 'react-i18nify';

const translate = getComponentTranslator('register');

const form = reduxForm({
  form: 'register',
});

class Register extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    register: PropTypes.func,
    errors: errorPropTypes,
    message: PropTypes.string,
    loading: PropTypes.bool,
  };

  static formSpec = [
    { id: 'firstName', name: 'name.first', label: translate('firstName'), type: 'text', placeholder: translate('firstNameExample'), component: TextInput },
    { id: 'lastName', name: 'name.last', label: translate('lastName'), type: 'text', placeholder: translate('lastNameExample'), component: TextInput },
    { id: 'email', name: 'email', label: translate('email'), type: 'email', placeholder: translate('emailExample'), component: TextInput },
    { id: 'password', name: 'password', label: translate('password'), type: 'password', placeholder: '********', component: TextInput },
    { id: 'passwordConfirm', name: 'passwordConfirm', label: translate('confirmPassword'), type: 'password', placeholder: '********', component: TextInput },
  ];

  handleFormSubmit = formProps => this.props.register(formProps);

  render = () => {
    const { handleSubmit, errors, message, loading } = this.props;

    return (
      <div className={`auth-box ${loading ? 'is-loading' : ''}`}>
        <h1><Translate value="register.title" /></h1>
        <GenericForm
          onSubmit={handleSubmit(this.handleFormSubmit)}
          errors={errors}
          message={message}
          formSpec={Register.formSpec}
          submitText={translate('submit')}
        />
        <Link className="inline" to="/login"><Translate value="register.haveAccount" /></Link>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  errors: authentication.errors[CHANGE_AUTH],
  message: authentication.messages[CHANGE_AUTH],
  loading: authentication.loading[CHANGE_AUTH],
  authenticated: authentication.authenticated,
});

export default connect(mapStateToProps, { register })(form(Register));
