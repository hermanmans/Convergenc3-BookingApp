import React, { Component } from 'react';
import moment from 'moment';
import Logs from './rooms';
import LogicalNot from './common/toggle';


class Update extends Component {
    state = {
        dates:{
              startDate:"",
              endDate:"",
        },
        room:{
            updatedRoom:"",
        },
        itemRooms:[],
        message:"",
    }

    fetchItems = async () => {
        const dataRooms = await fetch('http://localhost:8080/api/rooms')//retrieving data
        const itemRooms = await dataRooms.json();// data as JSON
        console.log(itemRooms);
        this.setState({itemRooms:itemRooms}); //setting data
    };
    
    getBookingKey = JSON.parse(localStorage.getItem('bookingKey'));
    currentUser = JSON.parse(localStorage.getItem('users'))[0];
    getPrevStartDate = JSON.parse(localStorage.getItem('prevStartDate'));
    getPrevEndDate = JSON.parse(localStorage.getItem('prevEndDate'));//display purposes
    componentDidMount(){
        this.fetchItems();
        this.setState({message:
        `Selected dates to update: 
        From ${this.getPrevStartDate}
        To ${this.getPrevEndDate}`});
    }
    handleClick = (event, key) => {
        const room = {...this.state.room};
        room.updatedRoom = key;
        const currentUser = JSON.parse(localStorage.getItem('users'))[0];
        const testStart = JSON.parse(localStorage.getItem('startDate'));
        const testEnd = JSON.parse(localStorage.getItem('endDate'));
        
        // const roomSelected = key;
        console.log(testEnd);
        console.log(testStart);
        console.log(currentUser);
        console.log(event.target);
        this.setState({room})
        
    }
    handleChange= e =>{
    const dates = {...this.state.dates};
    dates[e.currentTarget.name] = e.currentTarget.value;
    this.setState({dates:dates});
    }
    handleUpdate = async (e) => {
        console.log(this.state.room);
        e.preventDefault();
        const {dates}=this.state;
        const startDate = moment(new Date(dates.startDate)).format("DD/MM/YYYY")
        const endDate = moment(new Date(dates.endDate)).format("DD/MM/YYYY")
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate,
                userRef:this.currentUser,
                roomSelected:this.state.room.updatedRoom,
            })
        };

        try{
            const response = await fetch(`http://localhost:8080/bookingDates/${this.getBookingKey}`, requestOptions);
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error("Something bad happened");
            console.error(err);
      };

    }
    render() { 
        const {dates}=this.state;
        const {message}=this.state;
         
        return (
          <section className='datePicker'>
                <h4>Selected Dates From: {dates.startDate} To: {dates.endDate}</h4>
                <h4>Selected Room: </h4>
            <form onSubmit={this.handleUpdate}>
                <div className="mb-3">
                <label htmlFor="dates" className="htmlForm-label">Start Date</label>
                <input
                    name="startDate"
                    value={dates.startDate}
                    onChange={this.handleChange}
                    id="startDate"
                    type="date"
                    className="htmlForm-control" 
                    />
                <label htmlFor="dates" className="htmlForm-label">End Date</label>
                <input
                    name="endDate"
                    value={dates.endDate}
                    onChange={this.handleChange}
                    id="endDate"
                    type="date"
                    className="htmlForm-control" 
                    />
                <button type='submit' className="btn btn-primary">Update Booking</button>
                </div>
            </form>
            <h5>{message}</h5>
                <div className='roomTable'>
                    <table>
                        <tbody>
                        <tr>
                            <th>Room Name</th>
                            <th>Room Address</th>
                            <th>Room Code</th> 
                        </tr>
                            {React.Children.toArray(this.state.itemRooms.map((item,key) => (
                                <React.Fragment>
                                 <tr className="alert alert-info " role="alert">
                                    <td>{item.roomName}</td>
                                    <td>{item.roomAddress}</td>
                                    <td>{item.roomCode}</td>
                                    <td><img src={item.roomImage} alt='img' width={300}></img></td>
                                    <td><button className="btn btn-primary mb-5" onClick={event => this.handleClick(event,item.roomName)} key={key} >Confirm Room</button></td>
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
        }
    }
    
export default Update;
 
