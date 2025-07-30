// 1 require mongoose 
const mongoose = require("mongoose");

// 2 create schema
const { Schema, model } = mongoose ;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: {type: String, required: true },
    price:{ type: Number, required: true },
    id_user:{ type: Schema.Types.ObjectId, ref:"user", required: true },
});

// 3 export
module.exports = Product = model("Product", productSchema);