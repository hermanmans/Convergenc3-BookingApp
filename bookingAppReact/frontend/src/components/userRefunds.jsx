import React, { Component } from 'react';
import { useEffect,useState } from 'react';
// import UserMessage from './common/message';
import UserMessage from './common/message';

function UserRefunds(){
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    const currentUser = JSON.parse(localStorage.getItem('users'))[0];
    ///copied from rooms 
    const fetchItems = async () => {
        try{
            const data = await fetch(`http://localhost:8080/refund/${currentUser}`)//retrieving data
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
        return (
            <React.Fragment>
                <React.Fragment>
                    <UserMessage
                    message1="User Refunds"
                    message2="Your current account details"
                    to="/"
                    message3="Back"
                    />
                </React.Fragment>
                <div className='account'>
                <table className='userRefundResults'>
                    <tbody>
                        <tr>
                            <th>Room Name</th>
                            <th>Duration of Stay</th>
                            <th>Cancelation Notice Period</th>
                            <th>Total Cost</th>
                            <th>Refund Amount</th>
                        </tr> 
                    {React.Children.toArray(items.map((item) => (
                        <tr className="alert alert-info " role="alert">
                            <td>{item.roomSelected}</td>
                            <td>{item.duration}</td>
                            <td>{item.timeToVisit}</td>
                            <td>R {item.total.toFixed(2)}</td>
                            <td>R {item.refundAmount.toFixed(2)}</td>
                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
                </div>
            </React.Fragment>
        );
    }

 
export default UserRefunds;
