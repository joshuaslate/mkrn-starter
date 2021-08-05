import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextInput from '../form-fields/text-input';
import GenericForm from '../form-fields/generic-form';
import { forgotPassword, RESET_PASSWORD } from '../../redux/modules/authentication';
import { errorPropTypes } from '../../util/proptype-utils';
import './authentication.scss';
import { getComponentTranslator } from '../../util/i18n';
import { Translate } from 'react-i18nify';

const translate = getComponentTranslator('forgotPassword');

const form = reduxForm({
  form: 'forgotPassword',
});

class ForgotPassword extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
    errors: errorPropTypes,
    message: PropTypes.string,
    loading: PropTypes.bool,
  };

  static formSpec = [
    { id: 'email', name: 'email', label: translate('email'), type: 'email', placeholder: 'you@yourdomain.com', component: TextInput },
  ];

  handleFormSubmit = formProps => this.props.forgotPassword(formProps);

  render() {
    const { handleSubmit, errors, message, loading } = this.props;
    return (
      <div className={`auth-box ${loading ? 'is-loading' : ''}`}>
        <h1><Translate value="forgotPassword.title" /></h1>
        <GenericForm
          onSubmit={handleSubmit(this.handleFormSubmit)}
          errors={errors}
          message={message}
          formSpec={ForgotPassword.formSpec}
          submitText={translate('submit')}
        />
        <Link className="inline" to="/login"><Translate value="forgotPassword.backToLogin" /></Link>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  errors: authentication.errors[RESET_PASSWORD],
  message: authentication.messages[RESET_PASSWORD],
  loading: authentication.loading[RESET_PASSWORD],
});

export default connect(mapStateToProps, { forgotPassword })(form(ForgotPassword));
