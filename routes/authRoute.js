const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, getProfile, deleteProfile, updateProfile} = require('../controller/userController');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');

router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/user/:id', getUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);

router.get('/profile', verifyToken, getProfile);
router.delete('/delete-profile', verifyToken, deleteProfile);
router.put('/update-profile',verifyToken, updateProfile);


module.exports = router;

