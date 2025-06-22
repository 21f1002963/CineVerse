const express = require('express');
const { body } = require('express-validator');
const PaymentRouter = express.Router();

const { getPaymentController, updatePremiumAccessController } = require('../CONTROLLER/PaymentsController');
// const { protectRouteMiddleWare } = require('../CONTROLLER/AuthenticationController'); // Uncomment if you have auth middleware

/**
 * @swagger
 * /api/payment/order:
 *   post:
 *     summary: Initiate a payment order
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Payment order initiated
 *       500:
 *         description: Payment initiation failed
 */
PaymentRouter.post(
  '/order',
  // [body('amount').isNumeric(), body('currency').isString()], // Uncomment and adjust as needed
  getPaymentController
)
/**
 * @swagger
 * /api/payment/update_premium_access:
 *   patch:
 *     summary: Update user to premium access
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User is now premium
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 */
.patch(
  '/update_premium_access',
  [body('email').isEmail().normalizeEmail().withMessage('Valid email is required')],
  // protectRouteMiddleWare, // Uncomment if you want to protect this route
  updatePremiumAccessController
);

module.exports = PaymentRouter;