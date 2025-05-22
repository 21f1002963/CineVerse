const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const wishListSchema = new mongoose.Schema({
    poster_path: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true },
    media_type: { type: String, required: true },
}); 

const SchemaRules = {
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [10, "Password must be atleast 10 characters long"]
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 10,
        validate: [function(){
            return this.password === this.confirmPassword;
        }, "Password and confirm password do not match"]
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    isPremium:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'feed curator', 'moderator'],
        default: 'user'
    },
    otp:{
        type: String
    },
    otpExpiry:{
        type: Date
    },

    wishList: [wishListSchema], 
}

const userSchema = new mongoose.Schema(SchemaRules);
let validCategories = ['Admin', 'User', 'Seller'];

userSchema.pre("save", async function(next){
    const user = this;
    const password = user.password;
    const confirmPassword = user.confirmPassword;
    if (password == confirmPassword) {
        delete user.confirmPassword
        user.password = await bcrypt.hash(password, 10);
    } else {
        const err = new Error("Password and confirmPassword are not the same ")
        next(err)
    }
});

userSchema.pre("save", function (next) {
    const user = this;
    if (user.role) {
        const isValid = validCategories.includes(user.role);
        if (isValid) {
            next();
        } else {
            return next(err);
        }
    } else {
        user.role = "user";
        next();
    }
})

userSchema.post("save", function(next){
    console.log('New user created');
    this["_id"] = undefined;
    this.__v = undefined;
    this.password= undefined;
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;