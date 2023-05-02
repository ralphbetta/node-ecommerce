const Product = require('../model/productModel');
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

    Product.findByIdAndDelete(id).then((response)=>{
        if(response){
            return res.status(200).json({ message: "deleted successfuly", data: response });
        }else{
            return res.status(401).json({ message: "Item not found", data: {}});
        }
    }).catch((error)=>{
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


module.exports = { createProduct, getProduct, getAllProduct, editProduct, deleteProduct };