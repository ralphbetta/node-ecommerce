const BlogCategory = require('../model/blogCategoryModel');

const createBlogCategory = async (req, res) => {

    BlogCategory.create(req.body).then((response) => {
        res.status(200).json({ message: "Succesful", data: response });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });

}


const updateBlogCategory = async (req, res) => {
    const id = req.params.id;
    BlogCategory.findByIdAndUpdate(id, req.body, { new: true }).then((response) => {
        res.status(200).json({ message: "Updated Succesful", data: response });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });

}


const getBlogCategory = async (req, res) => {
    const id = req.params.id;
    BlogCategory.findById(id).then((response) => {
        res.status(200).json({ message: "Succesful", data: response });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}

const getAllBlogCategory = async (req, res) => {
    BlogCategory.find().then((response) => {
        res.status(200).json({ message: "Succesful", data: response });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}

const deleteBlogCategory = async (req, res) => {
    const id = req.params.id;
    BlogCategory.findByIdAndDelete(id).then((response) => {
        res.status(200).json({ message: "Deleted Succesfuly", data: {} });
    }).catch((error) => {
        res.status(500).json({ message: "Server Error", data: error });
    });
}

module.exports = {
    createBlogCategory,
    updateBlogCategory,
    getBlogCategory,
    getAllBlogCategory,
    deleteBlogCategory,
}
