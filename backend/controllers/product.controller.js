import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async(req,res)=>{
    try{
        const productData = await Product.find({});
        res.status(200).json({success:true,data : productData});
    }catch(error){
        console.log("Error : ",error.message);
        res.status(500).json({success:false,message : "server error"});
    }
}

export const createProduct = async(req,res) =>{
    try{
        const product = req.body;
        if(!product.name || !product.price ||!product.image){
            return res.status(400).json({success:false,message : "Please Provide all fields"});
        }
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({success:true,message : "Product Inserted"});
    }catch(error){
        console.log("Error : ",error.message);
        res.status(500).json({success:false,message : "server error"});
    }
}

export const updateProduct = async(req,res) => {
    try{
        const {id} = req.params;
        const product = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false,message : "Invalid Product Id"});
        }
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new : true});
        res.status(200).json({success:true,data : updatedProduct});
    }catch(error){
        console.log("Error : ",error.message);
        res.status(500).json({success:false,message : "server error"});
    }
}

export const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message : "Product Deleted"});
    }catch(error){
        console.log("Error :",error.message);
        res.status(500).json({success:false,message : "server error"});
    }
}