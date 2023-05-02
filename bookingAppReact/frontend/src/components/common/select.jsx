import React, { Component } from "react";

class Selection extends Component {
  state = {
    message:"Available",
    toggle:true,
  };

  handleIncrement = () => {
    this.setState({ message: "Selected" });
    if(this.state.message==="Selected"){
      this.setState({ message: "Available" })
    }
    console.log(this.state.message);
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Confirm Booking
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.message === "Available" ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { message } = this.state;
    return message;
  }
}

export default Selection;
