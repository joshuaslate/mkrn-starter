import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Billing from '../../components/billing/bitcoin';


const AuthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/dashboard" component={Billing} />
  </Switch>
);

export default AuthenticatedRoutes;
