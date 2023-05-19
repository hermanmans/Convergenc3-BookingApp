import React,{useEffect,useState,Component} from 'react';
import SelectDates from './dateSelect';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LogicalNot from './common/toggle';
import Selection from './common/select';
import ConfirmAlert from './common/confirmAlert';
import ShowValues from './common/show';
import {Link} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { date } from 'joi';
import moment from 'moment';
import axios from 'axios';




function Logs() {
    const location = useLocation();
    const selection = location.state;

    useEffect( () => {
        fetchItems();
        fetchBookingKeyForUser();
    }, []);
    
    const [itemRooms, setRooms] = useState([]);
    const [booking, setBooking] = useState([]);
    const [items, setItems] = useState([]);
    const [avail, setAvail] = useState([]);
    const [message, setMessage] = useState("");
    localStorage.setItem('users', JSON.stringify(["5","hsmans@gmail.com"]));////HARDCODED REMOVE
    // const currentUser = JSON.parse(localStorage.getItem('users'))[0];
    const currentUser = "5";
    const[bookingNumber,setNumber]=useState("");
    

    // const fetchItems = async () => {
    //     const dataRooms = await fetch('http://127.0.0.1:8080/api/rooms')//retrieving data
    //     const itemRooms = await dataRooms.json();// data as JSON
    //     console.log(itemRooms);
    //     setRooms(itemRooms); //setting data
    // };
    // const config = {
    //     headers:{"Access-Control-Allow-Origin": "*"}
    //   };
    const fetchItems = async () => {
        try{
            const dataRooms = await axios.get(`http://127.0.0.1:8080/api/rooms`)//retrieving data
            // const itemRooms = dataRooms.data;
            // window.location.replace(itemRooms);
            console.log(dataRooms);
            setRooms(itemRooms); //setting data
            // window.location.replace(`http://127.0.0.1:8080/api/rooms`);
        
        }catch(err){
            console.log("No results found");
            console.log(err);
        }
    }
    
    
    // const fetchBookingKeyForUser = async () => {
    //     try{
    //         const data = await fetch(`http://localhost:8080/api/userDates/${currentUser}`)//retrieving data
    //         const items = await data.json();// data as JSON
    //         setItems(items);
    //         // const bookingNumber = (items.slice(-1)[0].bookingKey);
    //         const bookingNumber = "1";
    //         setNumber(bookingNumber);
    //         console.log("Here"+bookingNumber);
    //         if (!data.ok) {
    //             throw new Error(`Error! status: ${data.status}`);
    //           }
              
    //     } catch (err) {
    //         console.error("No results found");
    //         console.error(err);
    //   }
    
    // };
    const fetchBookingKeyForUser = async () => {
        try{
            const dataUser = await axios.get(`http://localhost:8080/userDates/${currentUser}`)//retrieving data
            const items = dataUser.data;
            setItems(items);
            // const bookingNumber = (items.slice(-1)[0].bookingKey);
            const bookingNumber = "15";
            setNumber(bookingNumber);
            console.log("Here"+bookingNumber);
              
        } catch (err) {
            console.error("No results found");
            console.error(err);
      }
    
    };
    // const fetchTotal = async () => {
    //     try{
    //         const dataBooking = await fetch(`http://localhost:8080/api/userTotal/${bookingNumber}`);//retrieving data
    //         const booking= await dataBooking.json();// data as JSON
    //         console.log(booking.total);
            
    //     } catch (err) {
    //         const message = "No results found";
    //         setMessage(message);
    //         console.error("No results found");
    //     };
    // };
    const fetchTotal = async () => {
            try{
                const dataBooking = await axios.get(`http://localhost:8080/userTotal/${bookingNumber}`);//retrieving data
                const booking= dataBooking.data;
                console.log(booking.total);
            } catch (err) {
                const message = "No results found";
                setMessage(message);
                console.error("No results found");
            };
        };

    // const fetchRoomAvailability = async (date,room) => {
    //     try{
    //         const data = await fetch(`http://localhost:8080/findBetween/${date}/${room}`)//retrieving data
    //         const avail = await data.json();// data as JSON
    //         setAvail(avail);
    //         console.log(avail);
    //         // const bookingNumber = (items.slice(-1)[0].bookingKey);
    //         // setNumber(bookingNumber);
    //         if(avail.length>0){
    //             console.log("Booking dates not available!");
    //         }else{
    //             return console.log("Available");
    //         }
            
    //         if (!data.ok) {
    //             throw new Error(`Error! status: ${data.status}`);
    //           }

    //     } catch (err) {
    //         console.error("Something went wrong");
    //         console.error(err);
    //   }
      const fetchRoomAvailability = async (date,room) => {
        try{
            const data = await axios.get(`http://localhost:8080/findBetween/${date}/${room}`)//retrieving data
            const avail = data.data
            setAvail(avail);
            console.log(avail);
            // const bookingNumber = (items.slice(-1)[0].bookingKey);
            // setNumber(bookingNumber);
            if(avail.length>0){
                console.log("Booking dates not available!");
            }else{
                return console.log("Available");
            }

        } catch (err) {
            console.error("Something went wrong");
            console.error(err);
      }
    };
    const handleClick = (event, key) => {
        // const currentUser = JSON.parse(localStorage.getItem('users'))[0]; ///REMEMBER TO EDIT
        const currentUser = "5";
        const testStart =moment(new Date(selection.startDate)).format("YYYY-MM-DD");
        const testEnd = moment(new Date(selection.endDate)).format("YYYY-MM-DD");
        fetchRoomAvailability("18052023",key);
        fetchRoomAvailability("22052023",key);
    
        // fetchRoomAvailability(selection.startDate,key);
        // fetchRoomAvailability(selection.endDate,key);


        fetch('http://localhost:8080/bookingDates',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                  startDate: testStart,
                  endDate: testEnd,
                  userRef:currentUser,
                  roomSelected:key,
                }),
            }).then(()=>{
                console.log('New Dates Posted');
                console.log(typeof(testStart));
                console.log(testEnd);
                console.log(currentUser);
                console.log(key);

            }).catch(function (error) {
                console.log(error);
                console.log("Did not post");
              });

            }

    return(
            <section className='results'>
                <h1>Rooms</h1>
                {/* <h1>{state}</h1> */}
                <div className='roomTable'>
                    <table>
                        <tbody>
                        <tr>
                            <th>Room Name</th>
                            <th>Room Address</th>
                            <th>Room Code</th>
                            <th></th>
                            <th>Total Cost</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={fetchTotal}>View Pricing</button>
                            </td>
                        </tr>
                            {React.Children.toArray(itemRooms.map((item,key) => (
                                <React.Fragment>
                                 <tr className="alert alert-info " role="alert">
                                    <td>{item.roomName}</td>
                                    <td>{item.roomAddress}</td>
                                    <td>{item.roomCode}</td>
                                    <td><img src={item.roomImage} alt='img' width={300}></img></td>
                                    <td>R {booking.total}</td>
                                    <td><button className="btn btn-primary mb-5" onClick={event => handleClick(event,item.roomName)} key={key} >Confirm Room</button></td>
                                    {/* <ConfirmAlert
                                     myFunc={fetchTotal}
                                    /> */}
                                 </tr>
                                 <tr>
                                    <div>
                                        <LogicalNot
                                        label="Read More"
                                        description={item.roomDescription}/>
                                    </div>
                                 </tr>
                                </React.Fragment>
                                 
                             ))
                        )}

                        </tbody>
                    </table>
                    
                </div>
            </section>
        );
};


export default Logs;