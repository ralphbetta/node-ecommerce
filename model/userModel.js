//!mdbgum -short cut
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    wishList: { type: mongoose.Schema.Types.ObjectId, ref: "Product " },
    refreshToken: { type: String },
    date: {
        type: Date,
        default: Date.now,
    },
},

    { timestamps: true }
);


// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);;
    next();
});


userSchema.methods.isPasswordMatched = async (enteredPassword) => {

    // return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);