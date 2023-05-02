import React,{useEffect,useState,Component} from 'react';
import moment from 'moment';
import Input from './common/input';
const Joi = require('joi');

class SelectDates extends Component {
    state = {
      dates:{
            startDate:"",
            endDate:"",
      },
      errors:{},
      message:"",
    } 
    
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        console.log("Submitted");
        const {dates}=this.state;
        const startDate = moment(new Date(dates.startDate)).format("DD/MM/YYYY");
        const endDate = moment(new Date(dates.endDate)).format("DD/MM/YYYY");

        localStorage.setItem('startDate', JSON.stringify(startDate));
        localStorage.setItem('endDate', JSON.stringify(endDate));
        
        console.log(startDate);
        console.log(endDate);
        window.location.replace('/rooms');    
        }

    handleChange= e =>{
        const dates = {...this.state.dates};
        dates[e.currentTarget.name] = e.currentTarget.value;
        this.setState({dates:dates});
    }
    schema = Joi.object({
        startDate: Joi.string()
        .required()
        .label("Start Date") ,
        endDate: Joi.string()
        .required()
        .label("End Date") ,
    });
    validate= ()=>{
        const {error} = this.schema.validate(this.state.dates,{ abortEarly: false });
        if (!error) return null;
        const errors={};
        for (let item of error.details) errors[item.path[0]] = item.message;
        console.log(error.details);
        return errors;
        };

      render() {
        const {dates}=this.state;
        const {message}=this.state;
        const {errors}=this.state;
        return (
            <section className='datePicker'>
                <h3>Please select your preferred dates</h3>
            <form onSubmit={this.handleSubmit}>
                 <Input
                    name="startDate"
                    value={dates.startDate}
                    label="Start Date"
                    onChange={this.handleChange}
                    type="date"
                    error={errors.startDate}
                />
                <Input
                    name="endDate"
                    value={dates.endDate}
                    label="End Date"
                    onChange={this.handleChange}
                    type="date"
                    error={errors.endDate} 
                />
                <button type="submit" className="btn btn-primary">Submit Dates</button>
            </form>
            <h5>{this.state.message}</h5>
            </section>
        );
    }
}
 
export default SelectDates;