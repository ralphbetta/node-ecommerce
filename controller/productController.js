const Product = require('../model/productModel');
const User = require('../model/userModel');
const slugify = require('slugify');

const createProduct = async (req, res) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const prodiuct = new Product(req.body);
    prodiuct.save().then((response) => {
        res.status(200).json({ message: "uploaded sucesfully", data: response });
    }).catch((error) => {
        res.status(500).json(error);
    });
}

const editProduct = async (req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { new: true }).then((response) => {
        if (response) {
            return res.status(200).json({ message: "Sccessful", data: response });
        } else {
            return res.status(401).json({ message: "Unsccessful", data: [] });
        }
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    })
}


const getProduct = async (req, res) => {
    const id = req.params.id;
    Product.findById(id).then((product) => {
        if (product) {
            return res.status(200).json({ message: "sucessful", data: product });
        } else {
            res.status(401).json({ message: "unsucessful", data: {} });
        };
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id).then((response) => {
        if (response) {
            return res.status(200).json({ message: "deleted successfuly", data: response });
        } else {
            return res.status(401).json({ message: "Item not found", data: {} });
        }
    }).catch((error) => {
        return res.status(500).json({ message: "Server Error", data: {} });
    });
}

const getAllProduct = (req, res) => {

    Product.find().then((products) => {
        return res.status(200).json({ message: "sucessful", data: products });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}

const filterAllProduct = (req, res) => {


    // Filtering
    const excludeFields = ["page", "sort", "limit", "fields", "itemsPerPage"];
    const queryObj = { ...req.query };
    excludeFields.forEach((item) => delete queryObj[item]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(get|gt|lte|lt)\b/g, (match) => `$$(match)`);


    Product.find(JSON.parse(queryStr)).then((query) => {

        // Filter by data - not tested
        if (req.query.startDate && req.query.endDate) {
            console.log(req.query.startDate);
            console.log(req.query.endDate);
            query = query.filter(obj => obj.updatedAt >= req.query.startDate && obj.updatedAt <= req.query.endDate);
        }

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query.sort((a, b) => a.sortBy - b.sortBy);
        } else {
            query.sort((a, b) => a.createdAt - b.createdAt);
        }

        // Fields
        if (req.query.fields) {
            query = query.map(({ title, price, slug, updatedAt }) => ({ title, price, slug, updatedAt }));
        }


        //pagination
        if (req.query.page) {

            const page = req.query.page; // Current page number
            const itemsPerPage = req.query.itemsPerPage; // Number of items per page
            const startIndex = (page - 1) * itemsPerPage;

            // Applying Limit
            if (req.query.limit) {
                const limit = req.query.limit;
                const endIndex = Math.min(startIndex + itemsPerPage, limit);
                query = query.slice(startIndex, endIndex);
            }

            const endIndex = startIndex + itemsPerPage;
            query = query.slice(startIndex, endIndex);
        }


        return res.status(200).json({ message: "sucessful", data: query });

    });
}

const addToWishList = async (req, res) => {
    const userID = req.userData.id;
    const prodID = req.body.productId;

    User.findById(userID).then((user)=>{

//   const hasWish =  user.wishList.find((id)=> id.toString == prodID);

      const hasWish =  user.wishList.includes(prodID);

     if(hasWish){
        User.findByIdAndUpdate(userID, {
            $pull: {
             "wishList":prodID
            }
         }, {new: true}).then((response)=>{
            return res.status(200).json({ message: "removed from wishlist", data: response });
         });
     }else{
        User.findByIdAndUpdate(userID, {
            $push: {
             "wishList":prodID
            }
         }, {new: true}).then((response)=>{
            return res.status(200).json({ message: "added to wishlist", data: response });
         });
     }
    
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}


module.exports = { createProduct, getProduct, getAllProduct, editProduct, deleteProduct, filterAllProduct, addToWishList };