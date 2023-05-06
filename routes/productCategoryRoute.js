const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/jwtToken');
const { createProductCategory } = require('../controller/productCategoryController');
const router = express.Router();


router.post('/', verifyToken, createProductCategory);


module.exports = router;