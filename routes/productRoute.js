const express = require('express');
const { createProduct, getProduct, getAllProduct, editProduct, deleteProduct } = require('../controller/productController');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const router = express.Router();


router.post('/create', createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);
router.put('/:id', verifyToken, isAdmin, editProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;