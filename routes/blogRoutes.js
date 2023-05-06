const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const { createBlog, getAllBlog, getBlog } = require('../controller/blogController');

router = express.Router();


router.post('/', verifyToken, createBlog);
router.get('/', verifyToken, getAllBlog);
router.get('/:id', verifyToken, getBlog);



module.exports = router;

