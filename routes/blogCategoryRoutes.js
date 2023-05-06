const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const { createBlog } = require('../controller/blogController');
const { getAllProductCategory, getProductCategory, updateProductCategory, deleteProductCategory } = require('../controller/productCategoryController');

router = express.Router();


router.post('/', verifyToken, createBlog);
router.get('/', verifyToken, getAllProductCategory);
router.get('/:id', verifyToken, getProductCategory);
router.put('/:id', verifyToken, updateProductCategory);
router.delete('/:id', verifyToken, deleteProductCategory);


module.exports = router;

