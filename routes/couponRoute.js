const express = require('express');
const { createCoupon } = require('../controller/couponController');

const router = express.Router();

router.post("/", createCoupon);

module.exports = router;