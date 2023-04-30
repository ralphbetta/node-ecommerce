
const { generateToken } = require('../middleware/jwtToken');
const User = require('./../model/userModel');
// const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const email = req.body.email;

    User.findOne({ email: email }).then((result) => {

        User.create(req.body).then((response) => {
            console.log(response);
            return res.status(201).json({
                message: 'User created successfully',
                body: response
            });

        }).catch((error) => {
            return res.status(409).json({
                message: 'User Already Exit',
                success: false
            });
        });

    }).catch((error) => {
        return res.status(500).json({ message: 'Server Error' });
    });

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {

        if (user) {
        bcrypt.compare(req.body.password, user.password).then((match) => {
            const userData = { email: user.email, name: user.name, id: user._id, role: user.role };
            if (match) {
                return res.status(200).json({sucess: true, data: user, token:generateToken(userData) });
            } else {
                return res.status(401).json({ "message": "Authentication failed. Invalid user or password." })
            }

            });
        } else {
            return res.status(401).json({
                message: 'User does not exist',
                data: user,
            });
        }

    }).catch((error) => {
        res.json({ message: 'Server error' })
    })
}


 const getAllUsers = (req, res) => {
    User.find().then((users)=>{
      res.send(users);
    }).catch((err)=>{
        console.error(err);
        res.status(500).send(err);
    });
  };


  const getUser =(req, res)=>{
    const id = req.params.id;

    User.findById(id).then((user)=>{
        if(user){
            return res.json({data:user, success: true});
         }else{
            return res.json({data:user, success: false});
         }
    }).catch((error)=>{
        res.status(405).send({message:"User not found"});
        console.log(error);
    })
  }


  const deleteUser =(req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id).then((user)=>{
        res.status(200).send({data:user, message:"deleted"});
    }).catch((error)=>{
        res.status(405).send({message:"unable to delete user"});
        console.log(error);
    })
  }

  const updateUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {new:true}).then((user)=>{
     if(user){
        return res.json({data:user, success: true});
     }else{
        return res.json({data:user, success: false});
     }
    }).catch((err)=>{
        console.error(err);
       return res.status(404).send('User not found');
    });
  };

module.exports = { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser };