const express = require('express');
const Product  = require('../model/productModel');


const createProduct = async (req, res) => {
    const prodiuct = new Product(req.body);
    prodiuct.save().then((response)=>{
        res.status(200).json({message:"uploaded sucesfully", data: response}); 
    }).catch((error)=>{
        res.status(500).json(error);
    });
}

module.exports = {createProduct};