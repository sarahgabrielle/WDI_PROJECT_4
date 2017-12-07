import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TripEdit from './TripEdit';
import TripShow from './TripShow';
import TripNew from './TripNew';

const TripRoutes = () => {
  return(
    <Switch>
      <Route path="/trips/new" component={TripNew} />
      <Route path="/trips/:id/edit" component={TripEdit} />
      <Route path="/trips/:id" component={TripShow} />
    </Switch>
  );
};

export default TripRoutes;
