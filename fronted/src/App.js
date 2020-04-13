import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./components/Auth";
import BookingPage from "./components/Booking";
import EventsPage from "./components/Events";
import MainNavigation from "./components/Navigation/Main-Navigation";
import authContext from "./context/authContext";

import "./App.css";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId) => {
    this.setState({ token, userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <authContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {!this.state.token && (
                  <Redirect from="/booking" to="/auth" exact />
                )}
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && (
                  <Redirect from="/auth" to="/events" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                <Route path="/events" component={EventsPage} />
                {this.state.token && (
                  <Route path="/booking" component={BookingPage} />
                )}
                <Route path />
              </Switch>
            </main>
          </authContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
