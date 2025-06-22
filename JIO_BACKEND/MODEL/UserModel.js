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
        minlength: [10, "Password must be atleast 10 characters long"]
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

userSchema.pre("save", async function(next){
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;