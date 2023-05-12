const Coupon = require('../model/coupon');



const createCoupon = (req, res)=>{
    Coupon.create(req.body).then((response)=>{
        if(response){
            res.status(200).json({message:"successful", data: response});
        }else{
            res.status(400).json("response");
        }
    }).catch((error)=>{
        res.status(405).json({message:"unsuccessful", data: error});
    });
}

module.exports  = {createCoupon};