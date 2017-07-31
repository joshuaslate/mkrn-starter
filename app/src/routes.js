import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import ForgotPassword from './components/authentication/forgot-password';
import ResetPassword from './components/authentication/reset-password';

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password/:token" component={ResetPassword} />
  </Switch>
);

export default Routes;
