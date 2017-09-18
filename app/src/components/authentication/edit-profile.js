import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import TextInput from '../form-fields/text-input';
import GenericForm from '../form-fields/generic-form';
import { getUser, GET_USER } from '../../redux/modules/user';
import { errorPropTypes } from '../../util/proptype-utils';
import { bindActionCreators } from 'redux';

const form = reduxForm({
    form: 'edit',
  });

class EditProfile extends Component{
 

    static propTypes = {
        handleSubmit: PropTypes.func,
        getUser:PropTypes.func,
        errors: errorPropTypes,
        message: PropTypes.string,
        loading: PropTypes.bool,
      };

      static formSpec = [
        { id: 'firstName', name: 'name.first', label: 'First Name', type: 'text', component: TextInput},
        { id: 'lastName', name: 'name.last', label: 'Last Name', type: 'text', component: TextInput}
      ];

      handleFormSubmit = formProps => "this.props.edit(formProps)";

      render = () => {
        const { handleSubmit, errors, message, loading } = this.props;
    
        return (
          <div className={`auth-box ${loading ? 'is-loading' : ''}`}>
            <h1>Edit Profile</h1>
            <GenericForm
              onSubmit={handleSubmit(this.handleFormSubmit)}
              errors={errors}
              message={message}
              formSpec={EditProfile.formSpec}
              submitText="Save"
            />
            <br/>
          </div>
        );
      }
}

// const mapStateToProps = ({ user }) => ({
//     errors: authentication.errors[GET_USER],
//     message: authentication.messages[GET_USER],
//     loading: authentication.loading[GET_USER],
//     authenticated: authentication.authenticated
//   });

const mapStateToProps = (state) => {
    const { user } = state
      return { user }
  }

  const mapDispatchToProps = (dispatch) => {
    // here is how I would map the actions individually
    return {
      getUser: bindActionCreators(getUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(form(EditProfile));