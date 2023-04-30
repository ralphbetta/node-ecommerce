const express = require('express');
const {dbConnect, dbConnectLive} = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouther = require('./routes/authRoute');
const bodyParser = require('body-parser');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const cokieParser = require('cookie-parser');

dbConnectLive();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//---------- For Refresh Token [b4 the route] -------
app.use(cokieParser());
//---------------------------------------------------

app.use('/api/auth', authRouther);



// app.use(notFound);
// app.use(errorHandler);


app.listen(PORT, (req, res)=>{
   console.log(`Server running at port http://localhost:${PORT}/s`); 
});
