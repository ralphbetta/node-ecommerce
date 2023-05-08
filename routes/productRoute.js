const express = require('express');
const { createProduct, getProduct, getAllProduct, editProduct, deleteProduct, filterAllProduct, addToWishList, rating } = require('../controller/productController');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const router = express.Router();


router.post('/create', createProduct);
router.get('/filter', filterAllProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);
router.post('/rating', verifyToken, rating);
router.put('/:id', verifyToken, isAdmin, editProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);
router.post('/add_to_wishlist', verifyToken, addToWishList);


module.exports = router;