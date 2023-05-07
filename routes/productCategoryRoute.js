const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const { createProductCategory, getAllProductCategory, getProductCategory, updateProductCategory, deleteProductCategory } = require('../controller/productCategoryController');
const router = express.Router();


router.post('/', verifyToken, createProductCategory);
router.get('/', verifyToken, getAllProductCategory);
router.get('/:id', verifyToken, getProductCategory);
router.put('/:id', verifyToken, updateProductCategory);
router.delete('/:id', verifyToken, deleteProductCategory);


module.exports = router;