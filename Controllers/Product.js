const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    try {
        const {name , description , price} = req.body;
        const newProduct = new Product({ 
            name,
            description, 
            price,
            id_user: req.user._id,
        });
        await newProduct.save();
        res.status(200).send({msg: "Product added successfully", newProduct});

    } catch (error) {
        res.status(400).send({msg: `can not add product ${error}`});
    }
};

exports.getAllProduct = async (req,res) => {
    try {
        const listProducts = await Product.find();
        res.status(200).send({msg: "List of all products..", listProducts });
    } catch (error) {
        res.status(400).send({msg: `can not get products ${error}`});

    }
};

//by id
exports.getOneProduct = async (req,res) => {
    try {
     const productToGet = await Product.findOne({_id: req.params.id});
        res.status(200).send({msg: "Product found", productToGet});
    } catch (error) {
        res.status(400).send({msg: "Can not get product with this id!!", error});
    }
};
//BY ID
exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        await Product.findOneAndDelete({ _id });
        res.status(200).send({msg: "Product deleted successfully"});
    } catch (error) {
        res.status(400).send({msg: "Can not delete product!!", error});
        
    }
};
//by id

exports.editProduct = async (req,res) => {
    try {
        const {_id} = req.params;
        const result = await Product.updateOne({_id}, { $set: {...req.body}});
    res.status(200).send({msg: "Product updated successfully"});
    } catch (error) {
        res.status(400).send({msg: "Can not update product with this id!!", error});
    };
};