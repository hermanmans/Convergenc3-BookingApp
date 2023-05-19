import React,{useEffect,useState,Component} from 'react';
import {NavLink,Link,useNavigate} from 'react-router-dom';
import ShowValues from './common/show';

function UserBookings() {
    // const UserBookings = ()=>{
    //     const navigate = useNavigate;
    //     const openBooking = (key,prevstart,prevend)=>{
    //         navigate("/updateBooking",{
    //         state:{
    //             key:"key",
    //             prevstart:"start",
    //             prevend:"end",
    //         }
    //     });
    // }

    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    // const currentUser = JSON.parse(localStorage.getItem('users'))[0];
    const currentUser = "5";
    ///copied from rooms 
    const fetchItems = async () => {
        try{
            const data = await fetch(`http://localhost:8080/userDates/${currentUser}`)//retrieving data
            const items = await data.json();// data as JSON
            setItems(items);
            console.log(items);
            if (!data.ok) {
                throw new Error(`Error! status: ${data.status}`);
              }
        } catch (err) {
            const message = "No results found";
            setMessage(message);
            console.error("No results found");
            console.error(err);
      };
    };
    /////
    const handleDelete = async (key,item) => {
        alert("Are you sure you want to cancel your booking?");
        console.log(key);
        console.log(item);
        localStorage.setItem('deletedBooking', JSON.stringify(item));
        try {
            const response =await fetch(`http://localhost:8080/bookingCancelled/${key}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: "Cancelled",
                })
            });
        //   const response = await fetch(`http://localhost:8080/bookingDates/${key}`, {
        //     method: 'DELETE',////Deleting User
        //   });
          ////Posting User to refund table
          const getDeletedUser = JSON.parse(localStorage.getItem('deletedBooking'));
          console.log(getDeletedUser.bookingKey);
              fetch('http://localhost:8080/refund',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                  startDate: getDeletedUser.startDate,
                  endDate: getDeletedUser.endDate,
                  duration:getDeletedUser.duration,
                  userRef:getDeletedUser.userRef,
                  roomSelected:getDeletedUser.roomSelected,
                  total:getDeletedUser.total,
                }),
            }).then(()=>{
                console.log('New Dates Posted')

            })
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }else{
            //Update the state
            console.log("Your booking has been cancelled");
            //Create a post to refund table in backend?
          }
        } catch (err) {
            console.error("Something bad happened");
            console.error(err);

      };
    }
    const handleClick = (event, key,prevstart,prevend) => {
        console.log(key);
        console.log(prevstart);
        console.log(prevend);
        // openBooking(key,prevstart,prevend);
        localStorage.setItem('prevStartDate', JSON.stringify(prevstart));
        localStorage.setItem('prevEndDate', JSON.stringify(prevend));
        localStorage.setItem('bookingKey', JSON.stringify(key));
        window.location.replace('/updateBookings');
        
    }
    return(
            <section className='results'>
                <h1>User Bookings</h1>
                <ShowValues
                func={fetchItems}
                />
                {/* <button id='toggle' onClick={()=>{
                    if(document.querySelector('.userBookedResults').style.display === 'block'){
                        document.querySelector('.userBookedResults').style.display = 'none';
                        document.querySelector('#toggle').innerHTML = "Show Results";
                        fetchItems();
                    }else{
                        document.querySelector('#toggle').innerHTML = "Hide";
                        document.querySelector('.userBookedResults').style.display = 'block';
                    }}}>Show Results</button> */}
                <h1>{message}</h1>
                {/* Below was copied from Rooms! */}
                <div className='history'>
                <table className='userBookedResults'>
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Duration</th>
                            <th>Room</th>
                            <th>Update Booking</th>
                            <th>Cancel Booking</th> 
                        </tr> 
                    {React.Children.toArray(items.map((item,key,prevstart,prevend) => {
                        if(item.status==="Confirmed"){
                            return(
                        <tr className="alert alert-info " role="alert">
                            <td>{item.userRef}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.duration}</td>
                            <td>{item.roomSelected}</td>
                            <td><button onClick={event => handleClick(event,item.bookingKey,item.startDate,item.endDate)} 
                            key={key}
                            prevstart={prevstart}
                            prevend={prevend}>Update Booking</button></td>
                            <td><button onClick={event =>handleDelete(item.bookingKey,item) }key={key} item={item}>Cancel Booking</button></td>
                            
                        </tr>
                        )}
                    })
                    )}
                    </tbody>
                    </table>
                </div>
            </section>
        );
};


export default UserBookings;