const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: Number,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisLiked: {
        type: Boolean,
        default: false,
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    image: {
        type: String,
        default: "path/image1.png",
    },
    author: {
        type: String,
        default: "Admin",
    },

    // toJSON: {
    //     virtuals: true
    // },

    // toObjects: {
    //     virtuals: true
    // },
},
{ timestamps: true,}
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);