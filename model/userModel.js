//!mdbgum -short cut
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { response } = require('express');
const crypto = require('crypto');
const Product = require('./productModel');


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
    },
    lastName: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    passwordResetToken: {
        type: String,
    },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: []}],
    refreshToken: { type: String },
    passwordChangedAt: {

        type:  Date,
        default: Date.now
    },
    passwordResetExpires:  {type:  Date},
},

    { timestamps: true }
);


// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);;
    next();
});


userSchema.methods.isPasswordMatched = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash("sha256").update(resettoken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return resettoken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);