import React from 'react';
import { Route, Switch } from 'react-router-dom';

const AuthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/dashboard" component={() => <div>Hello</div>} />
  </Switch>
);

export default AuthenticatedRoutes;
