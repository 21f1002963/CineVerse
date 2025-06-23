const dotenv = require('dotenv');
dotenv.config();
const PayU = require("payu");
const ShortID = require('short-unique-id');
const uid = new ShortID({ length: 10 });
const { PAYU_PUBLIC_KEY, PAYU_SECRET_KEY } = process.env;
const UserModel = require('../MODEL/UserModel'); // Fix: Import UserModel

const payuClient = new PayU({
    key: PAYU_PUBLIC_KEY,
    salt: PAYU_SECRET_KEY,
},"test");

const getPaymentController = async (req, res) => {
    try {
        // TODO: Validate req.body for amount, currency, etc. if needed
        const amount = 1000;
        const currency = "INR";
        const receipt = `rp_${uid.rnd()}`;
        const orderConfig = {
            amount,
            currency,
            receipt,
        };
        const order = await payuClient.paymentInitiate(orderConfig);
        res.status(200).json({
            status: "success",
            order
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Payment initiation failed"
        });
    }
};

const updatePremiumAccessController = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({
                status: "failed",
                message: "Email is required"
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        await UserModel.findOneAndUpdate(
            { email },
            { $set: { isPremium: true } },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            message: "User is now premium"
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Failed to update premium access"
        });
    }
};

module.exports = {
    getPaymentController,
    updatePremiumAccessController
};