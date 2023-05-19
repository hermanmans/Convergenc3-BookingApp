import React,{useEffect,useState,Component} from 'react';
import {Link,NavLink} from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light span">
        <Link className="navbar-brand" to="/">
          Getaway
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/selectDates">
              Book a room
              </NavLink>
            <NavLink className="nav-item nav-link" to="/userBookings">
              My Bookings
            </NavLink>
            <NavLink className="nav-item nav-link" to="/userRefunds">
              Account
            </NavLink>
            <NavLink className="nav-item nav-link" to="/about">
              Contact Us
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Log Out
            </NavLink>
          </div>
        </div>
      </nav>
    );
  
}
 
export default NavBar;