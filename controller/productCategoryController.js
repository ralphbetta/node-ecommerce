const ProductCategory = require('../model/productCatModel');
const winston = require('winston'); //advange error logger

const createProductCategory = async (req, res) => {

    ProductCategory.create(req.body).then((response) => {
        res.status(200).json({ message: "Succesful", data: response });
    }).catch((error) => {
        // winston.error(error.stack);
        logger.warn(error);
        res.status(500).json({ message: "Server Error", data: error });
    });

}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});



const updateProductCategory = async (req, res) => {

    const id = req.params.id;
    ProductCategory.findByIdAndUpdate(id, req.body, { new: true }).then((response) => {
        res.status(200).json({ message: "Updated Succesful", data: response });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });

}


const getProductCategory = async (req, res) => {
    const id = req.params.id;
    ProductCategory.findById(id).then((response) => {
        res.status(200).json({ message: "Succesful", data: response });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}

const getAllProductCategory = async (req, res) => {
    ProductCategory.find().then((response) => {
        res.status(200).json({ message: "Succesful", data: response });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}

const deleteProductCategory = async (req, res) => {

}

module.exports = {
    createProductCategory,
    updateProductCategory,
    getProductCategory,
    getAllProductCategory,
    deleteProductCategory,
}
