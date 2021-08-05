import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Translate } from 'react-i18nify';

const AuthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/dashboard" component={() => <div><Translate value="dashboard.welcomeText" /></div>} />
  </Switch>
);

export default AuthenticatedRoutes;
