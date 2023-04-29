const express = require('express');
const { registerUser } = require('../controller/userController');

router = express.Router();


router.post('/register', createUser);


module.exports = router;

