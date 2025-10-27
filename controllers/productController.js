import {v2 as cloudinary} from "cloudinary"
import { productModel } from "../models/ProductModel.js";
<<<<<<< HEAD


// add products by seller : path = api/product/addProduct
export const addProduct = async (req, res)=>{
   try {
    // it converts the string into js object
    let productData = JSON.parse(req.body.productData)

    // to get the uploaded images from multer
    const images = req.files;

    // function of converting image into urls by cloudinary
    let imageUrl = await Promise.all(
        images.map( async (item) => {
            let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
            return result.secure_url;
        })
    )

    // save to the mongodb
    await productModel.create({...productData, image: imageUrl});

    res.json({
        message: "Image Added!"
    })

   } catch (error) {
    console.log(error.message);
    res.json({
        message: error.message
    })    
   }
}

// get product list : path = api/product/list
export const productList = async (req, res) => {
    try {
        const productList = await productModel.find();
        res.json({
            message: "List of all products",
            productList
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
=======

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
>>>>>>> bae04014d289be2616c472ed0c5aeb4e86e43fdc
    }
}

// get signle product by id : path = api/product/id
export const productById = async (req, res)=>{
    try {
        const {id} = req.body

<<<<<<< HEAD
        const product = await productModel.findById(id);

=======
    try {
        const {id} = req.body
        const product = await productModel.findById(id);
>>>>>>> bae04014d289be2616c472ed0c5aeb4e86e43fdc
        res.json({
            product
        })
    } catch (error) {
<<<<<<< HEAD
        console.log(error.message);
        res.json({
            message: error.message
        })
=======
        console.log(error.message)
>>>>>>> bae04014d289be2616c472ed0c5aeb4e86e43fdc
    }
}

// change inStock: path = api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const {id, inStock} = req.body
<<<<<<< HEAD

        await productModel.findByIdAndUpdate(id, {inStock})

        res.json({
            message: "product stock updated!"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
}
=======
        await productModel.findByIdAndUpdate(id, {inStock});
        res.json({
            message: "stock updated!"
        })
    } catch (error) {
        console.log(error.message)
    }
}                     
>>>>>>> bae04014d289be2616c472ed0c5aeb4e86e43fdc
