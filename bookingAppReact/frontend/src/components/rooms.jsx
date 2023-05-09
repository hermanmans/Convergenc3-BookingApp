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



function Logs() {
    const location = useLocation();
    const selection = location.state;

    useEffect( () => {
        fetchItems();
        fetchTotal();
        fetchBookingKeyForUser();
    }, []);
    
    const [itemRooms, setRooms] = useState([]);
    const [booking, setBooking] = useState([]);
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    const currentUser = JSON.parse(localStorage.getItem('users'))[0];
    const[bookingNumber,setNumber]=useState("");


    const fetchItems = async () => {
        const dataRooms = await fetch('http://localhost:8080/rooms')//retrieving data
        const itemRooms = await dataRooms.json();// data as JSON
        setRooms(itemRooms); //setting data
    };
    const fetchBookingKeyForUser = async () => {
        try{
            const data = await fetch(`http://localhost:8080/userDates/${currentUser}`)//retrieving data
            const items = await data.json();// data as JSON
            setItems(items);
            const bookingNumber = (items.slice(-1)[0].bookingKey);
            setNumber(bookingNumber);
            console.log(bookingNumber);
            if (!data.ok) {
                throw new Error(`Error! status: ${data.status}`);
              }
              
        } catch (err) {
            console.error("No results found");
            console.error(err);
      }
    
    };
    const fetchTotal = async () => {
        try{
            const dataBooking = await fetch(`http://localhost:8080/userTotal/${bookingNumber}`);//retrieving data
            const booking= await dataBooking.json();// data as JSON
            console.log(booking.total);
            
        } catch (err) {
            const message = "No results found";
            setMessage(message);
            console.error("No results found");
        };
    };
    
    const handleClick = (event, key) => {
        const currentUser = JSON.parse(localStorage.getItem('users'))[0];
        const testStart =moment(new Date(selection.startDate)).format("DD/MM/YYYY");
        const testEnd = moment(new Date(selection.endDate)).format("DD/MM/YYYY");


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
                console.log('New Dates Posted')

            })
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
                            <button onClick={fetchTotal}>View Pricing</button>
                            {React.Children.toArray(itemRooms.map((item,key) => (
                                <React.Fragment>
                                 <tr className="alert alert-info " role="alert">
                                    <td>{item.roomName}</td>
                                    <td>{item.roomAddress}</td>
                                    <td>{item.roomCode}</td>
                                    <td><img src={item.roomImage} alt='img' width={300}></img></td>
                                    <td>R {booking.total}</td>
                                    <td><button className="btn btn-primary mb-5" onClick={event => handleClick(event,item.roomName)} key={key} >Confirm Room</button></td>
                                    <ConfirmAlert
                                     myFunc={fetchTotal}
                                    />
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