import {v2 as cloudinary} from "cloudinary"
import { productModel } from "../models/ProductModel.js";


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
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
}

// change inStock: path = api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const {id, inStock} = req.body

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