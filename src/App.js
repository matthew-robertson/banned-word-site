import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import UserRootPage from './pages/dashboard/UserRootPage'
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
	    </Switch>
	  </div>
  );
}

export default App;
