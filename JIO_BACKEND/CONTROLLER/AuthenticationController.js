import { otpGenerator } from '../UTILITY/OTPGenerator';
const { JWT_SECRET } = process.env;
const UserModel = require('../MODEL/UserModel');
const emailSender = require('../UTILITY/DynamicEmailSender');
const jwt = require('jsonwebtoken');
const util = require('util');  

const promisify = util.promisify;
const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const pathToOtpHTML = path.join(__dirname, "../", "TEMPLATES", "OTP.html");
const HtmlTemplateString = fs.readFileSync(pathToOtpHTML, "utf-8");

async function signUpHandler(req, res) {
    try {
        const userObject = req.body;
        
        if(!userObject.email || !userObject.password) {
            return res.status(400).json({
                message: 'Email or password is missing',
                status: "failure"
            });
        }
        
        const user = await UserModel.findOne({ email:  userObject.email });
        
        if(user){
            return res.status(400).json({
                message: 'User already exists',
                status: "Failure"
            });
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(userObject.password, saltRounds);

        const newUserObject = {
            ...userObject,
            password: hashedPassword,
        };
        
        const newUser = await UserModel.create(newUserObject);
        
        res.status(201).json({
            message: 'User created successfully',
            status: "success",
            user: {
                email: newUser.email,
                name: newUser.name, 
                _id: newUser._id,
            }
        });
    } catch(error) {
        console.log('Error while creating user', error);
        res.status(500).json({
            message: 'Internal server error',
            status: "failure"
        });
    }
}

async function loginHandler(req, res) {
    try{
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email: email });
        
        if(!user){
            return res.status(400).json({
                message: 'Invalid user or password',
                status: "Failure"
            });
        }
        
        if (user) {
            let areEqual = await bcrypt.compare(password,user.password);
            if (areEqual) {
                let token = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);
                res.cookie("JWT", token, { maxAge: 90000000, httpOnly: true, path: "/" });
                res.status(200).json({
                    message: 'User logged in successfully',
                    status: "Success",
                    user: user
                })
            } else {
                res.status(404).json({
                    status: "Failure",
                    message: "Email or Password is incorrect"
                })
            }
        }
            
    } catch(error) {
            res.status(500).json({
                message: 'Internal server error',
                status: "Failure"
            });
    }
}

async function logoutHandler(req, res) {
    try{
        res.clearCookie('jwt', {path : '/'});
        res.json({
            message: 'User logged out successfully',
            status: "success"
        });
    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            status: "failure"
        });
    }
}

//*************************************

async function forgetPasswordHandler(req, res){
    try{
        const { email } = req.body;
        if(email == undefined){
            return res.status(400).json({
                status: "Failure",
                message: 'Email is missing'
            });
        }

        const user = await UserModel.findOne({ email: email });

        if(!user){
            return res.status(404).json({
                status: "failure",
                message: 'User not found'
            });
        }

        const OTP = OTPgenerator();
        
        const tempelateData = {name:user.name, OTP: user.otp}
        
        await emailSender("./TEMPLATES/OTP.html", user.email, tempelateData);

        await UserModel.findOneAndUpdate(
            { email: email },
            {
              $set: {
                token: otp,
                otpExpiry: Date.now() + 1000 * 60 * 5, 
              },
            },
            { new: true }
        );
        
        res.status(200).json({
            status: "success",
            message: 'OTP sent to email',
            otp: OTP,
            resetURL: `http://localhost:2200/api/auth/resetPassword/${user[_id]}`
        });


    }catch(error){
        console.log('Error while sending reset password link', error);
        res.status(500).json({
            message: 'Internal server error',
            status: "Failure"
        });
    }    
}

async function resetPasswordHandler(req, res){
    try{
        let resetDetails = req.body;

        if(!resetDetails.password||!resetDetails.confirmPassword||!resetDetails.otp||resetDetails.password!=resetDetails.confirmPassword){
            return res.status(401).json({
                status: "Failure",
                message: 'Invalid input'
            });
        }

        const user = await UserModel.findById(req.params.userID);

        if(!user){
            return res.status(404).json({
                status: "failure",
                message: 'User not found'
            });
        }

        if(user.otp == undefined ){
            return res.status(401).json({
                status: "failure",
                message: 'Unauthorized access to reset Password'
            });
        }

        if(user.otp != resetDetails.otp || user.otpExpiry < Date.now()){
            return res.status(401).json({
                status: "failure",
                message: 'OTP Expired'
            });
        }
        
        if(user.otp != resetDetails.otp){
            return res.status(401).json({
                status: "failure",
                message: 'OTP Invalid'
            });
        }
        
        if (user) {
            if (resetDetails.otp && user.otp == resetDetails.otp) {
                let currentTime = Date.now();
                if (currentTime < user.otpExpiry) {
                    user.confirmPassword = resetDetails.confirmPasword;
                    user.password = resetDetails.password;
                    delete user.otp;
                    delete user.otpExpiry
                    await user.save();
                    res.status(200).json({
                        status: "success",
                        message: "Password reset successfully"
                    })
                }
            } else {
                res.status(404).json({
                    status: "failure",
                    message: "OTP is not Found or Wrong"
                })
            }
        } else {
            res.status(404).json({
                status: "failure",
                message: "No User found"
            })
        }        
    }catch(error){
        console.log('Error while resetting password', error);
        res.status(500).json({
            message: 'Internal server error',
            status: "failure"
        });
    }
}

async function profileHandler(req, res) {
    try{
        const UserId = req.id;
        const user = await UserModel.findById(UserId);
        
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                status: "failure"
            });
        }
        
        res.status(200).json({
            message: 'User profile',
            status: "success",
            user: user
        });
    }
    catch(error){
        console.log('Error while fetching user profile', error);
        res.status(500).json({
            message: 'Internal server error',
            status: "failure"
        });
    }
}

// MIDDLEWARES
async function protectRouteMiddleWare(req, res, next) {
        try{
            const jwttoken = req.cookies.jwt;
            
            if(!jwttoken) {
                return res.status(401).json({
                    message: 'Unathorized user',
                    status: "failure"
                });
            }
        
            let decryptedToken = await promisifiedJWTVerify(jwttoken, JWT_SECRET);

            if (decryptedToken) {
                let userId = decryptedToken.id;
                // adding the userId to the req object
                req.userId = userId;
                next();
            }
        }catch(error) {
        console.log('Error while verifying token', error);
        res.status(500).json({
            message: 'Internal server error',
            status: "failure"
        });
    }
}

async function isAdminMiddleWare(req, res, next){
    try {
        let id = req.userId;
        let user = await UserModel.findById(id);
        if (user.role == "Admin") {
            console.log("authorized admin");

            next();
        } else {
            console.log("returning back ")
            res.status(401).json({
                status: "failure",
                "message": "You are not authorized to do this action "
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}

const isAuthorizedMiddleWare = function (allowedRoles) {
    return async function (req, res, next) {
        try {
            let id = req.userId;
            let user = await UserModel.findById(id);
            let isAuthorized = allowedRoles.includes(user.role);
            if (isAuthorized) {
                console.log("authorized user");
                next();
            } else {
                console.log("returning back ")
                res.status(401).json({
                    status: "failure",
                    "message": "You are not authorized to do this action "
                })
            }

        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: "failure"
            })

        }
    }
}
 
module.exports={
    signUpHandler,
    loginHandler,
    logoutHandler,
    profileHandler,
    forgetPasswordHandler,
    resetPasswordHandler,
    protectRouteMiddleWare,
    isAdminMiddleWare,
    isAuthorizedMiddleWare
}