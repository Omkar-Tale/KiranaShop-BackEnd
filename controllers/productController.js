import {v2 as cloudinary} from "cloudinary"
import { productModel } from "../models/ProductModel.js";

// add products by seller : path = api/product/addProduct
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
                return result.secure_url
            })
        )

        await productModel.create({...productData, image: imagesUrl})

        res.json({
            message: "product added"
        })
    } catch (error) {
        console.log(error.message)
    }
}

// get product list : path = api/product/list
export const productList = async (req, res)=>{
    try {
        const products = await productModel.find({});
        res.json({
            products
        })
    } catch (error) {
        console.log(error.message)
    }
}

// get signle product by id : path = api/product/id
export const productById = async (req, res)=>{

    try {
        const {id} = req.body
        const product = await productModel.findById(id);
        res.json({
            product
        })
    } catch (error) {
        console.log(error.message)
    }
}

// change inStock: path = api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const {id, inStock} = req.body
        await productModel.findByIdAndUpdate(id, {inStock});
        res.json({
            message: "stock updated!"
        })
    } catch (error) {
        console.log(error.message)
    }
}                     