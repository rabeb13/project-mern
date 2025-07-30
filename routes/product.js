// 1 require express
const express = require('express');
const { 
     addProduct,
     getAllProduct,
     getOneProduct,
     deleteProduct,
     editProduct,
    } 
= require("../Controllers/Product");
const isAuth = require('../midlleware/isAuth');


// 2 express router
const router = express.Router();

// 3 add product
router.post("/addproduct", isAuth, addProduct);

// 4 get all products
router.get("/getProducts", getAllProduct);

// 5 get one product (by id)
router.get("/:id", getOneProduct);

// 6 delete product (by id)
router.delete("/:_id", deleteProduct);

// 7 edit product (by id)
router.put("/:_id", editProduct);

// 8 export
module.exports = router;