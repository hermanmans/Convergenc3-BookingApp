import React, { Component } from 'react';
import Input from './common/input';
import { NavLink } from 'react-router-dom';
import { x } from 'joi';
const Joi = require('joi');

class Login extends Component {
    state = {
        account:{
            userEmail:"",
            password:"",
        },
        errors:{},
        message:"",
    }

    async getUsers() {
        const {account}=this.state;
        // GET request using fetch with async/await
        try{
            const response = await fetch(`http://localhost:8080/api/login/${account.password}/${account.userEmail}`);
            const data = await response.json();
            console.log(data);
             if(data.userEmail === this.state.account.userEmail && data.password === this.state.account.password ){
                 this.setState({message:"Success"});
                 console.log("Success");
                 localStorage.setItem('users', JSON.stringify([data.entryId,account.userEmail]));
                 window.location.replace('/selectDates');
            }else{
               return this.setState({message:"Invalid Email or Password!"});
            }
        }catch(e) {
            console.log(e);
            throw new Error("Invalid Email or Password!");
        }
    };
            
    schema = Joi.object({
        userEmail: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .label("Email") ,
        password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
        .label("Password")

    });
    validate= ()=>{
        const {error} = this.schema.validate(this.state.account,{ abortEarly: false });
        if (!error) return null;
        const errors={};
        for (let item of error.details) errors[item.path[0]] = item.message;
        // "Minimum eight characters, at least one letter, one number and one special character:"
        return errors;
        };
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        console.log("Submitted");
        this.getUsers();
    }
    handleChange= (e) =>{
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account:account});
    }
    render() {
        const {account}=this.state;
        const {errors}=this.state;
        return (
        <React.Fragment>
            <div>
                <h1>Login</h1>
            </div>
            
            <form onSubmit={this.handleSubmit}>
                <Input
                name="userEmail"
                value={account.userEmail}
                label="Email"
                onChange={this.handleChange}
                type="email"
                error={errors.userEmail}/>
                <Input
                name="password"
                value={account.password}
                label="Password"
                onChange={this.handleChange}
                type="password"
                error={errors.password}/>   
                <button type="submit" className="btn btn-primary">Login</button> 
            </form>
            <h1>{this.state.message}</h1>
        </React.Fragment>
        );
    }
}
 
export default Login;