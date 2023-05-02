const express = require('express');
const { createProduct, getProduct, getAllProduct, editProduct } = require('../controller/productController');
const router = express.Router();


router.post('/create', createProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);
router.put('/:id', editProduct);

module.exports = router;