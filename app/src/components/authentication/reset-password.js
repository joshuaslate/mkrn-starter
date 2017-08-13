import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextInput from '../form-fields/text-input';
import GenericForm from '../form-fields/generic-form';
import { resetPassword, RESET_PASSWORD } from '../../redux/modules/authentication';
import { errorPropTypes } from '../../util/proptype-utils';
import './authentication.scss';

const form = reduxForm({
  form: 'resetPassword',
});

class ResetPassword extends Component {
  static propTypes = {
    resetPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
    errors: errorPropTypes,
    message: PropTypes.string,
    loading: PropTypes.bool,
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  };

  static formSpec = [
    { id: 'password', name: 'password', label: 'Password', type: 'password', placeholder: '********', component: TextInput },
    { id: 'passwordConfirm', name: 'passwordConfirm', label: 'Confirm Password', type: 'password', placeholder: '********', component: TextInput },
  ];

  handleFormSubmit = formProps => this.props.resetPassword(formProps, this.props.params.token);

  render() {
    const { handleSubmit, errors, message, loading } = this.props;
    return (
      <div className={`auth-box ${loading ? 'is-loading' : ''}`}>
        <h1>Reset Password</h1>
        <GenericForm
          onSubmit={handleSubmit(this.handleFormSubmit)}
          errors={errors}
          message={message}
          formSpec={ResetPassword.formSpec}
          submitText="Change Password"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  errors: authentication.errors[RESET_PASSWORD],
  message: authentication.messages[RESET_PASSWORD],
  loading: authentication.loading[RESET_PASSWORD],
});

export default connect(mapStateToProps, { resetPassword })(form(ResetPassword));
