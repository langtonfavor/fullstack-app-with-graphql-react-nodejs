import React from "react";
import { NavLink } from "react-router-dom";
import authContext from "../../context/authContext";
import "./mainNav.css";
const mainNavigation = (props) => (
  <authContext.Consumer>
    {(context) => {
      return (
        <header className="main-nav_section">
          <div className="main-nav_logo">
            <h1>X-Markets</h1>
          </div>
          <nav className="main-nav_items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">Authenticate</NavLink>
                </li>
              )}              
                {!context.token && (
                <li>
                  <NavLink to="/register">Sign Up</NavLink>
                </li>
              )}     
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/booking">Bookings</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </authContext.Consumer>
);

export default mainNavigation;
