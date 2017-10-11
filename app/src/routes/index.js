import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/authentication/login';
// import Billing from '../components/billing/credit-card-fields';
import Register from '../components/authentication/register';
import ForgotPassword from '../components/authentication/forgot-password';
import ResetPassword from '../components/authentication/reset-password';
import RequireAuth from '../components/hoc/require-auth';
import AuthenticatedRoutes from './authenticated/';

const TopLevelRoutes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password/:token" component={ResetPassword} />
    <Route path="/dashboard" component={RequireAuth(AuthenticatedRoutes)} />
  </Switch>
);

export default TopLevelRoutes;
