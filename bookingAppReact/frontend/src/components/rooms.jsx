import React,{useEffect,useState,Component} from 'react';
import SelectDates from './dateSelect';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LogicalNot from './common/toggle';
import Selection from './common/select';
//import {Link} from 'react-router-dom';


function Logs() {
    useEffect( () => {
        fetchItems();
    }, []);
    
    const [itemRooms, setRooms] = useState([]);


    const fetchItems = async () => {
        const dataRooms = await fetch('http://localhost:8080/rooms')//retrieving data
        const itemRooms = await dataRooms.json();// data as JSON
        setRooms(itemRooms); //setting data
    };
    const handleClick = (event, key) => {
        const currentUser = JSON.parse(localStorage.getItem('users'))[0];
        const testStart = JSON.parse(localStorage.getItem('startDate'));
        const testEnd = JSON.parse(localStorage.getItem('endDate'));
        console.log(testEnd);
        console.log(testStart);
        console.log(currentUser);
        console.log(key);
        console.log(event.target);
        window.location.replace('/submitted');


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
                
                <div className='roomTable'>
                    <table>
                        <tbody>
                        <tr>
                            <th>Room Name</th>
                            <th>Room Address</th>
                            <th>Room Code</th> 
                        </tr>
                            {React.Children.toArray(itemRooms.map((item,key) => (
                                <React.Fragment>
                                 <tr className="alert alert-info " role="alert">
                                    <td>{item.roomName}</td>
                                    <td>{item.roomAddress}</td>
                                    <td>{item.roomCode}</td>
                                    <td><img src={item.roomImage} alt='img' width={300}></img></td>
                                    <td><button className="btn btn-primary mb-5" onClick={event => handleClick(event,item.roomName)} key={key} >Confirm Room</button></td>
                                 </tr>
                                 <tr>
                                    <td>
                                        <LogicalNot
                                        label="Read More"/>
                                    </td>
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