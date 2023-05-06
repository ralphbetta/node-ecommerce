const ProductCategory = require('../model/productCatModel');

const createProductCategory  = async (req, res) => {

    ProductCategory.create(req.body).then((response)=>{
        res.status(200).json({ message: "Succesful", data: response });
    }).catch((error)=>{
        res.status(500).json({ message: "Server Error", data: error });
    });

}

const updateProductCategory  = async (req, res) => {

}


const getProductCategory  = async (req, res) => {
    
}

const getAllProductCategory  = async (req, res) => {

}

const deleteProductCategory  = async (req, res) => {
    
}

module.exports = {
    createProductCategory, 
    updateProductCategory,
    getProductCategory,
    getAllProductCategory,
    deleteProductCategory,
}
