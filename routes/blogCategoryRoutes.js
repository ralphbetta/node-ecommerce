const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const { createBlog } = require('../controller/blogController');
const { getAllBlogCategory, getBlogCategory, updateBlogCategory, deleteBlogCategory } = require('../controller/blogCategoryController');

router = express.Router();


router.post('/', verifyToken, createBlog);
router.get('/', verifyToken, getAllBlogCategory);
router.get('/:id', verifyToken, getBlogCategory);
router.put('/:id', verifyToken, updateBlogCategory);
router.delete('/:id', verifyToken, deleteBlogCategory);


module.exports = router;

