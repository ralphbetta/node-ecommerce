const express = require('express');
const { registerUser, loginUser } = require('../controller/userController');

router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);


module.exports = router;

