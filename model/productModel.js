const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    // },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Lenovo", "Tecno", "LG"],
    },
    quantity: Number,
    sold: {
        type: Number,
        default: 0,
        select: false, //hide this from fetch
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        enum: ["Black", "Brown", "Red"],
    },
    rating: [
        {
            star: Number,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",

            }
        }
    ],
},

    { timestamps: true }

);

//Export the model
module.exports = mongoose.model('Product', productSchema);