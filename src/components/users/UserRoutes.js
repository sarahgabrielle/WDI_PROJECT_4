import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserEdit from './UserEdit';
import UserShow from './UserShow';

const UserRoutes = () => {
  return(
    <Switch>
      <Route path="/users/:id/edit" component={UserEdit} />
      <Route path="/users/:id" component={UserShow} />
    </Switch>
  );
};

export default UserRoutes;
