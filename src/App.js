import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import AdminRootPage from './pages/adminpanel/AdminRootPage'
import AdminServersPage from './pages/adminpanel/AdminServersPage'
import AdminServerPage from './pages/adminpanel/AdminServerPage'
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/admin" component={AdminRootPage} />
      <Route exact path="/admin/servers" component={AdminServersPage} />
      <Route exact path="/admin/servers/:server_id" component={AdminServerPage} />
    </Switch>
  );
}

export default App;
