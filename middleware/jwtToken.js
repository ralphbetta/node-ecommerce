const jwt = require('jsonwebtoken');
const User = require('../model/userModel');


const generateToken = (userdata) => {
    return jwt.sign({ userdata }, process.env.JWT_SECRETE, { expiresIn: "3d" });
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        const id = decoded.userdata._id;

        const user = User.findById(id).then((user) => {
            //to send full details
            req.fullData = user;
            // console.log(user);
        });
        req.userData = decoded.userdata;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed. Token invalid.' });
    }
}

const isAdmin = async (req, res, next)=>{
    const id = req.userData.id;
    
    const user = User.findById(id).then((user) => {
        console.log(user.role);

        if(user){
            if(user.role !== 'admin'){
                return res.status(401).json({ message: 'You have no admin rights' });
            }else{
                next();
            }
        }else{
            throw new Error("User does not exist");
        }
    });
}

module.exports = { generateToken, verifyToken,  isAdmin};