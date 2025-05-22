const express = require('express');
const PaymentRouter = express.Router();

const {getPaymentController, updatePremiumAccessController} = require('../CONTROLLER/PaymentsController');

PaymentRouter.post('/order', getPaymentController)
.patch('/update_premium_access', updatePremiumAccessController);

module.exports = PaymentRouter;