const jwt = require('jsonwebtoken');

const generateRefreshToken = (userdata) => {
    return jwt.sign({ userdata }, process.env.JWT_SECRETE, { expiresIn: "1d" });
}


module.exports = generateRefreshToken;