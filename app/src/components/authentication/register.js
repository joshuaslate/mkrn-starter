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
    { id: 'firstName', name: 'name.first', label: 'First Name', type: 'text', placeholder: 'John', component: TextInput },
    { id: 'lastName', name: 'name.last', label: 'Last Name', type: 'text', placeholder: 'Snow', component: TextInput },
    { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'you@yourdomain.com', component: TextInput },
    { id: 'password', name: 'password', label: 'Password', type: 'password', placeholder: '********', component: TextInput },
    { id: 'passwordConfirm', name: 'passwordConfirm', label: 'Confirm Password', type: 'password', placeholder: '********', component: TextInput },
  ];

  handleFormSubmit = formProps => this.props.register(formProps);

  render = () => {
    const { handleSubmit, errors, message, loading } = this.props;

    return (
      <div className={`auth-box ${loading ? 'is-loading' : ''}`}>
        <h1>Register</h1>
        <GenericForm
          onSubmit={handleSubmit(this.handleFormSubmit)}
          errors={errors}
          message={message}
          formSpec={Register.formSpec}
          submitText="Register"
        />
        <Link className="inline" to="/login">Have an account?</Link>
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
