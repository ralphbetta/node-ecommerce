const express = require('express');
const { createProduct, getProduct, getAllProduct, editProduct } = require('../controller/productController');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const router = express.Router();


router.post('/create', createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);
router.put('/:id', verifyToken, isAdmin, editProduct);

module.exports = router;