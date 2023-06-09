import React, { Component } from 'react';
import Input from './common/input';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
// import Joi from 'joi-browser';
const Joi = require('joi');

class Register extends Component { 
    state = {
        account:{
            userName:"",
            userSurname:"",
            userEmail:"",
            phoneNumber:"",
            idNumber:"",
            password:"",
        },
        errors:{}
    }
    schema = Joi.object({
        userName: Joi.string()
        .required()
        .label("Username"),
        userSurname: Joi.string()
        .required()
        .label("Surname"),
        userEmail: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .label("Email") ,
        phoneNumber: Joi.string()
        .length(10).pattern(/^[0-9]+$/)
        .required()
        .label("Cell number"),
        idNumber: Joi.string()
        .required()
        .label("ID"),
        password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
        // .min(8)
        .label("Password")
        // .error(new Error('Was REALLY expecting a string')),

    });
    // .with('password', 'repeat_password');
    validate= ()=>{
        const {error} = this.schema.validate(this.state.account,{ abortEarly: false });
        if (!error) return null;
        const errors={};
        for (let item of error.details) errors[item.path[0]] = item.message;
        // "Minimum eight characters, at least one letter, one number and one special character:"
        return errors;
        };
        
    
    // validateProperty = (input) => {
    //     const obj = { [input.name]: input.value };
    //     const schema = { [input.name]: this.schema[input.name] };
    //     const { error } = Joi.validate(obj, schema);
    //     return error ? error.details[0].message : null;
    //   };
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
            //call the server
        console.log("Submitted");
        const {account}=this.state;

            
            fetch('http://localhost:8080/api/register',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    userName: account.userName,
                    userSurname:account.userSurname,
                    userEmail:account.userEmail,
                    phoneNumber:account.phoneNumber,
                    idNumber:account.idNumber,
                    password:account.password,
                }),
            }).then(()=>{
                console.log('New User Added')
            })
        }
    // componentDidMount() {
    //     const promise = axios.get(`http://localhost:8080/verifyRegistration`)
    //         .then(res => {
    //         const enable = res.data;
    //         this.setState({ enable });
    //         })
    //     console.log(promise);
    //     }
    handleChange= (e) =>{
        // const errors = { ...this.state.errors };
        // const errorMessage = this.validateProperty(input.value);
        // if (errorMessage) errors[input.name] = errorMessage;
        // else delete errors[input.name];

        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account:account});
    }
    async login() {
        const {account}=this.state;
        try{
            const response = await fetch(`http://localhost:8080/login/${account.password}/${account.userEmail}`);
            const data = await response.json();
            if(data.userEmail === this.state.account.userEmail && data.password === this.state.account.password ){
                this.setState({message:"Success"});
                console.log("Success");
                localStorage.setItem('users', JSON.stringify([data.entryId,account.userEmail]));
                window.location.replace("http://auth-server:9000/login");
           }else{
              return this.setState({message:"Invalid Email or Password!"});
           }
            
        }catch(e) {
            console.log(e);
            throw new Error("Invalid Email or Password!");
        }
    };
    getCurrentUser = async () => {
        const dataUser = await axios.get('http://127.0.0.1:8080/api/login');//retrieving data
        const currentUserTest = dataUser.data;
        console.log(currentUserTest);
    };
    render() { 
        const {account}=this.state;
        const {errors}=this.state; //object destructuring
        return (
        <React.Fragment>
            <div>
                <h1>Please provide Login details</h1>
            </div>
            <div className='workForm'>
                <div>
                    {/* <button onClick={this.login}>Login</button> */}
                    {/* <button><NavLink to='http://127.0.0.1:8080/api/login' className="nav-item nav-link">Login</NavLink></button> */}
                    <button><NavLink onClick={this.getCurrentUser} className="nav-item nav-link">Login</NavLink></button>
                    <button><NavLink to='/' className="nav-item nav-link">Register</NavLink></button>
                </div>
            </div>
            <h1>User Registration</h1>
            <form onSubmit={this.handleSubmit}>
                <Input
                name="userName"
                value={account.userName}
                label="Username"
                onChange={this.handleChange}
                type="text"
                error={errors.userName}/>
                <Input
                name="userSurname"
                value={account.userSurname}
                label="Surname"
                onChange={this.handleChange}
                type="text"
                error={errors.userSurname}/>
                <Input
                name="userEmail"
                value={account.userEmail}
                label="Email"
                onChange={this.handleChange}
                type="email"
                error={errors.userEmail}/>
                <Input
                name="phoneNumber"
                value={account.phoneNumber}
                label="Cellphone"
                onChange={this.handleChange}
                type="number"
                error={errors.phoneNumber}/>
                <Input
                name="idNumber"
                value={account.idNumber}
                label="ID Number"
                onChange={this.handleChange}
                type="number"
                error={errors.idNumber}/>
                <Input
                name="password"
                value={account.password}
                label="Create Password"
                onChange={this.handleChange}
                type="password"
                error={errors.password}/>    
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </React.Fragment>
        );
    }
}
 
export default Register;