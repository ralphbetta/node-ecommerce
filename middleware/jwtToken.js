const jwt = require('jsonwebtoken');


const generateToken =(userdata)=>{
    return jwt.sign({userdata}, process.env.JWT_SECRETE, {expiresIn: "3d"});
}

 verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'RESTFULAPIs');
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed. Token invalid.' });
  }
}

module.exports = {generateToken, verifyToken};