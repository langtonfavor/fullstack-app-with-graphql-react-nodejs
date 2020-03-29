import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthPage from './components/Auth'
import BookingPage from './components/Booking'
import EventsPage from './components/Events'

import './App.css';

function App() {
  return (
        <BrowserRouter>
            <Switch>
            <Redirect from="/" to="/auth" exact/>
            <Route path = "/auth" component={AuthPage}/>
            <Route path = "/events" component={EventsPage}/>
            <Route path = "/booking" component={BookingPage}/>
            <Route path />
            </Switch>
        </BrowserRouter>
  );
}

export default App;
