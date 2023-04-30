const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, getProfile, deleteProfile, updateProfile, blockUser, unblockUser, handleRefreshToken } = require('../controller/userController');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');

router = express.Router();


router.get('/refreshtoken', handleRefreshToken);
router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/user/:id', getUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);
router.put('/block-user/:id', verifyToken, isAdmin, blockUser);
router.put('/unblock-user/:id', verifyToken, isAdmin, unblockUser);

router.get('/profile', verifyToken, getProfile);
router.delete('/delete-profile', verifyToken, deleteProfile);
router.put('/update-profile', verifyToken, updateProfile);


module.exports = router;

