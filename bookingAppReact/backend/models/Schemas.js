const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String},
    password: {type:String},
    email: {type:String},
});

const timesheetSchema = new Schema({
    date: {type:Date, required:true},
    hours: {type:String, required:true},
    work: {type:String, required:true},
    user: {type:Schema.Types.ObjectId, ref:'users'}
});

const Users = mongoose.model('users', userSchema);
const Inputs = mongoose.model('form_inputs', timesheetSchema);
//const mySchemas = {'Users':Users, 'Inputs':Inputs};

module.exports = {Users,Inputs};