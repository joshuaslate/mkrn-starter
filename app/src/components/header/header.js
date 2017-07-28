import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/modules/user';

export class Header extends Component {
  render = () => (
    <div>
      <button onClick={() => { this.props.login({ email: 'test@davidmeents.com', password: '12345678' }); }}>
        Test login
      </button>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps, { login })(Header);
