import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UserMessage from './common/message';
const Confirmed = () => {
    return ( 
    <React.Fragment>
        <UserMessage
        message1="User Booking Confirmed"
        message2="Thank you for choosing Getaway"
        to="/userBookings"
        message3="View my bookings"/>
    </React.Fragment>
    );
}
    
    export default Confirmed;

