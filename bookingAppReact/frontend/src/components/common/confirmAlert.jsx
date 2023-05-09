import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ConfirmAlert extends React.Component {

  submit = ({myFunc}) => {
    confirmAlert({
      title: 'Confirm Submit',
      message: 'Are you sure you want to book this room?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            return this.props.myFunc();
          },
          
        },
        {
          label: 'No',
          onClick: () => alert('Cancel')
        }
      ]
    });
  };

  render() {
    return (
      <div className='container'>
        <button onClick={this.submit}>Select Booking</button>
      </div>
    );
  }
}
export default ConfirmAlert ;