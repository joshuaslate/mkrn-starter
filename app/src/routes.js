import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/authentication/login.container';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);

export default Routes;
