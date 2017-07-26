import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={() => <div>Test</div>} />
  </Switch>
);

export default Routes;
