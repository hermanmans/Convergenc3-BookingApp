import React,{useEffect,useState,Component} from 'react';
import './App.css';
import Home from './components/home';
import Logs from './components/rooms';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' //To route to different links
import NavBar from './components/navBar';
import Register from './components/register';
import About from './components/aboutUs';
import axios from 'axios';
import UserBookings from './components/userBookings';
import Login from './components/login';
import SelectDates from './components/dateSelect';
import InputDates from './components/common/dateForm';
import Update from './components/updateBooking';
import UserMessage from './components/common/message';
import UserRefunds from './components/userRefunds';
import Confirmed from './components/messageBookingConfirmed';

class App extends Component {
  state = { 
    bookings:[]
   } 
  render() { 

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <Routes>
            <Route path="/test" exact element = {<Home />} />
            <Route path="/" exact element = {<Register/>} />
            <Route path="/about" exact element = {<About />} />
            <Route path="/rooms" exact element = {<Logs />} />
            <Route path="/userBookings" exact element = {<UserBookings />} />
            <Route path="/login" exact element = {<Login />} />
            <Route path="/selectDates" exact element = {<SelectDates />} />
            <Route path="/updateBookings" exact element = {<Update />} />
            <Route path="/submitted/" exact element = {<Confirmed />} />
            <Route path="/userRefunds" exact element = {<UserRefunds />} />
        </Routes>

      </header>
    </div>
    </Router>
  );
}

}
export default App;
