
const User = require('./../model/userModel');
// const asyncHandler = require('express-async-handler');


createUser = async (req, res)=>{
    const email = req.body.email;

    User.findOne({email:email}).then((result)=> {
        if(!result){
         User.create(req.body).then((response) =>{
                return res.status(201).json({ message: 'User created successfully' });
            });
        }else{
            return res.status(402).json({ 
                message: 'User Already Exit',
                success: false
             });
        }
        

    }).catch((error)=>{
        return res.status(500).json({ message: 'Server Error' });
        // console.log(error);
    });

};

module.exports = {createUser}