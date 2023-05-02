import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
const UserMessage = ({message1,message2,to,message3}) => {
    return ( 
    <React.Fragment>
        <h1>{message1}</h1>
        <h3>{message2}</h3>
        <button><NavLink to={to} className="nav-item nav-link">{message3}</NavLink></button>
    </React.Fragment>
    );
}
    
    export default UserMessage;
// class UserMessage extends Component {
//     state = {
//         message1:"",
//         message2:""
//       } 
//     render() { 
//         return (
//             <React.Fragment>
//                 <h1>"Your Booking has been submitted"</h1>
//                 <h3>Thank you for choosing Getaway</h3>
//                 <button><NavLink to='/userBookings' className="nav-item nav-link">View My Bookings</NavLink></button>
//             </React.Fragment>
//         );
//     }
// }
 
// export default UserMessage;
