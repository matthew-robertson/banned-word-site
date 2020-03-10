import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import UserRootPage from './pages/dashboard/UserRootPage'
import AdminRootPage from './pages/adminpanel/AdminRootPage'
import AdminServersPage from './pages/adminpanel/AdminServersPage'
import AdminServerPage from './pages/adminpanel/AdminServerPage'
import UserServerPage from './pages/dashboard/UserServerPage'
import Header from './components/Header'
import './App.css';

function App() {
  return (
  	<div>
  		<Header/>
	    <Switch>
	      <Route exact path="/" component={LandingPage} />
	      <Route exact path="/servers/:server_id" component={UserServerPage} />
	      <Route exact path="/user" component={UserRootPage} />
	      <Route exact path="/admin" component={AdminRootPage} />
	      <Route exact path="/admin/servers" component={AdminServersPage} />
	      <Route exact path="/admin/servers/:server_id" component={AdminServerPage} />
	    </Switch>
	  </div>
  );
}

export default App;
