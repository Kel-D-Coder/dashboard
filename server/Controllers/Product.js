const http = require("http-status-codes");
const Product = require('../models/ProductModel');
const path = require("path");


const createProduct = async (req, res) => {
    try {
        // handling file upload
        if (!req.files || !req.files.productImg) {
            return res.status(400).json({ msg: "No product image uploaded" });
        }

        const productImg = req.files.productImg

        const productImgPathName = new Date().getTime().toString() + path.extname(productImg.name);

        const productImgPath = path.resolve("public", "uploads", productImgPathName);

        await productImg.mv(productImgPath);

        const newProduct = await Product.create({
            name: req.body.name,
            price: req.body.price,
            ingredients: req.body.ingredients,
            desc: req.body.desc,
            picture: productImgPathName,
            stats: req.body.stats
        })

        res.status(http.StatusCodes.CREATED).json({ msg: "Product successfully added", product: newProduct})
    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'server error', error: error.message})
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id })
        if (product.length == 0) {
            return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "product not found" });
        }
        res.status(http.StatusCodes.ACCEPTED).json(product);
    } catch (error) {
        res.status(500).json({ msg: 'server error', error: error.message });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        if (allProducts.length == 0) {
            return res.stats(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Products not found"})
        }
        res.status(http.StatusCodes.ACCEPTED).json(allProducts)
    } catch (error) {
        res.status(500).json({ msg: 'server error', error: error.message });
    } 
}


const deleteProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        res.status(http.StatusCodes.OK).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "server error" });
    }
}

const updateProduct = async (req, res) => {
    try {
        await Product.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(http.StatusCodes.CREATED).json({ msg: "Product updated successfully" });
    } catch (error) {
        res.status(http.StatusCodes.BAD_REQUEST).json({ msg: error.message });
    }
}

module.exports = {
    getProduct,
    getAllProduct,
    createProduct,
    deleteProduct,
    updateProduct
}