import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import CarEditor from '../pages/CarEditor';
import NewCar from '../pages/NewCar';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/editorcar" component={CarEditor} />
      <Route path="/newcar" component={NewCar} />
    </Switch>
  );
}
