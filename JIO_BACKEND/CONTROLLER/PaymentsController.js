const dotenv = require('dotenv');
dotenv.config();
const PayU = require("payu");
const ShortID = require('short-unique-id');
const uid = new ShortID({ length: 10 });
const cors = require('cors');
const {PORT, PAYU_PUBLIC_KEY, PAYU_SECRET_KEY} = process.env;

const payuClient = new PayU({
    key: PAYU_PUBLIC_KEY,
    salt: PAYU_SECRET_KEY,
},"test");

const getPaymentController = async (req, res) => {
    try{
        const amount = 1000;
        const currency = "INR";
        const receipt = `rp_${uid.rnd()}`;
        const orderConfig = {
            amount: amount,
            currency: currency,
            receipt: receipt,
        }
        
        const order = await payuClient.paymentInitiate(orderConfig)

        res.status(200).json({
            status: "success",
            order: order
        });

    } catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    }
}

const updatePremiumAccessController = async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        user.isPremium = true;
        await UserModel.findOneAndUpdate(
            {email: email},
            {$set:{isPremium: true}},
            {new: true}
        );
        res.status(200).json({
            status: "success",
            message: "User is now premium"
        });
    } catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    } 
}

module.exports = {
    getPaymentController,
    updatePremiumAccessController
}