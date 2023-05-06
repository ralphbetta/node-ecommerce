const User = require('../model/userModel');
const Blog = require('../model/blogModel');
const { response } = require('express');


const createBlog = async (req, res) => {
    const title = req.body.title;

    Blog.findOne({ title }).then((post) => {

        if (post) {
            return res.status(409).json({ message: "Post already Exist" });
        }
        Blog.create(req.body).then((response) => {
            return res.status(200).json({ message: "Blog created Succesfuly", data: response });
        }).catch((error) => {
            return res.status(500).json({ message: "Server Error", data: error });
        });
    })

}

const updateBlog = async (req, res) => {
    //console.log(req.body)
}

const getBlog = async (req, res) => {
    const id = req.params.id;

    Blog.findById(id).then((blog)=>{
        if (!blog) {
            return res.status(409).json({ message: "Post does not exist" });
        }
        return res.status(200).json({ message: "Succesfuly", data: blog });
    }).catch((error) => {
        return res.status(500).json({ message: "Server Error", data: error });
    });;
}

const getAllBlog = async (req, res) => {
    Blog.find().then((response) => {
       if(response){
        return res.status(200).json({ message: "Succesfuly", data: response });
       }else{
        return res.status(404).json({ message: "Not Found", data: {} });
       }
    }).catch((error) => {
        return res.status(500).json({ message: "Server Error", data: error });
    });
}

const deleteBlog = async (req, res) => {

}

const isLiked = async (req, res) => {

}



module.exports = { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, isLiked };

