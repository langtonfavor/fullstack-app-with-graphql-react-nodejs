import React from 'react'
import { NavLink } from 'react-router-dom'
import './mainNav.css'

const mainNavigation = props => (
    <header className="main-nav_section">
            <div className = "main-nav_logo">
            <h1>theEvent</h1>
            </div>
            <nav className = "main-nav_items">
                <ul>
                    <li><NavLink to="/auth">Authenticate</NavLink>
                    </li>

                    <li><NavLink to="/events">Events</NavLink>
                    </li>

                    <li><NavLink to="/booking">Bookings</NavLink>
                    </li>
                </ul>
            </nav>
    </header>
);

export default mainNavigation;
