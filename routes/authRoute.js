const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser} = require('../controller/userController');

router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);


module.exports = router;

