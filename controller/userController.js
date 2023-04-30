
const { generateToken } = require('../middleware/jwtToken');
const User = require('./../model/userModel');
// const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');

createUser = async (req, res) => {
    const email = req.body.email;

    User.findOne({ email: email }).then((result) => {

        User.create(req.body).then((response) => {
            console.log(response);
            return res.status(201).json({
                message: 'User created successfully',
                body: response
            });

        }).catch((error) => {
            return res.status(402).json({
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
            const userData = { email: user.email, name: user.name, _id: user._id };
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

module.exports = { createUser, loginUser }