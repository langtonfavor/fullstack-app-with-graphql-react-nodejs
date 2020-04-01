import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthPage from './components/Auth'
import BookingPage from './components/Booking'
import EventsPage from './components/Events'
import MainNavigation from './components/Navigation/Main-Navigation';

import './App.css';

function App() {
  return (
        <BrowserRouter>
            <React.Fragment>
            <MainNavigation />
        <main className="main-content">
            <Switch>
            <Redirect from="/" to="/auth" exact/>
            <Route path = "/auth" component={AuthPage}/>
            <Route path = "/events" component={EventsPage}/>
            <Route path = "/booking" component={BookingPage}/>
            <Route path />
            </Switch>
        </main>
        </React.Fragment>
        </BrowserRouter>
  );
};

export default App;
