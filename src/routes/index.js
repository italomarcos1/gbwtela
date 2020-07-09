import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/profile" component={Profile} />

      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
