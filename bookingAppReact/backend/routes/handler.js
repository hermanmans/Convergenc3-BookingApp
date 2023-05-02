const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas');


/*router.post('/addUser',async (req, res) => {// to register a new user
    const newUsername =req.body.username; //form inputs in register
    const newPassword =req.body.password; 
    const newEmail =req.body.email;
    const user = {
        username:newUsername,
        password:newPassword,
        email:newEmail,
    };
    const newUser = new Schemas.Users(user);
    try{
        await newUser.save(async(err, newUserResult) => {// .save() function used to save document to database
        res.end('New user created!');
        });
    }catch(err){
        console.log(err);
        res.end('User not added');
    }
});
*/
router.post('/login',async (req, res) => {// to register a new user
    const mail =req.body.loginEmail; 
    const pass =req.body.loginPassword;
    const user = Schemas.Users;
    let response;
    try {
    response =await user.findOne({email:mail}).exec();
    //res.redirect('/timesheet');
    res.end('Login Succesful');
    } catch (err) {
    logger.error('Http error', err);
    return res.status(500).send();
    }
});


router.get('/logs', async(req, res) => {
    const form_inputs= Schemas.Inputs;
    const userInputs = await form_inputs.find({}).populate("user").exec((err, inputData) => {
        if (err) throw err;
        if (inputData) {
            res.end(JSON.stringify(inputData));
        } else {
            res.end();
        }
    });
});
////////////////////////////////
router.post('/addLogs', async (req, res) => {
    const name = req.body.userEntry;
    const userDate = req.body.date;
    const userHours = req.body.hours;
    const userWork = req.body.description;
    const user = Schemas.Users;
    const userId = await user.findOne({username:name}).exec();

    const newInput = new Schemas.Inputs({
        date: userDate,
        hours: userHours,
        work: userWork,
        user: userId._id
    });

    try {
        await newInput.save( (err, newResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/logs');
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.redirect('/logs');
        res.end();
    }
});
router.post('/', (req, res) => {
    res.send('hello world');
  });

  router.get('/login/:id', async (req, res) => {
    const getUser= Schemas.Users
    try{
        const data = await getUser.findById(req.params.id);
        res.json(data.password);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;