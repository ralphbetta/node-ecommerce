const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const { createBlog, getAllBlog, getBlog, updateBlog, deleteBlog } = require('../controller/blogController');

router = express.Router();


router.post('/', verifyToken, createBlog);
router.get('/', verifyToken, getAllBlog);
router.get('/:id', verifyToken, getBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);



module.exports = router;

