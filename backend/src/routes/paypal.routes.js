const express = require('express');
const router = express.Router();
const { createOrder, captureOrder } = require('../controllers/paypal.controller');

router.post('/createOrder', createOrder);
router.post('/captureOrder', captureOrder)

module.exports = router;