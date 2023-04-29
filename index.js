const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouther = require('./routes/authRoute');
const bodyParser = require('body-parser');

dbConnect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', authRouther);


app.listen(PORT, (req, res)=>{
   console.log(`Server running at port http://localhost:${PORT}/s`); 
});
