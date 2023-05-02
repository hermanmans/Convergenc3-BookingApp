const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
// const mongoose = require('mongoose');
const pool =require('./config/db.js')
// const cors = require("cors");


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);
// app.use(cors());


pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  });

// // DB Connection
// mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
// .then( () => {
//     console.log('DB Connected!');
// })
// .catch( (err) => {
//     console.log(err);
// });

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

