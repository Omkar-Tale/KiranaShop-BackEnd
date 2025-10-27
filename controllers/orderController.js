import { orderModel } from "../models/OrderModel.js";
import {productModel} from "../models/ProductModel.js"

// place order cod method: /api/order/cod
export const placeOrderCOD = async(req, res)=>{
    try {
        const {userId, address, items} = req.body

        if(!address || items.length === 0){
            res.json({
                message: "Invalid Data!"
            })
        }

        // calculate the items amount
        const amount = await items.reduce(async(acc, item)=>{
            const product = await productModel.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        // add 2% tax
        amount += Math.floor(amount * 0.02)

        await orderModel.create({
            userId,
            address,
            items,
            amount,
            paymentType: "COD"
        })

        res.json({
            success: true,
            message: "Order Placed!"
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            ErrorMsg: error.message
        })        
    }
}

// get orders by userId : api/order/user
export const getUserOrders = async(req, res)=>{
    try {
        const {userId} = req.body
        const orders = await orderModel.find({
            userId,
            $or : [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})

        res.json({
            success: true,
            orders
        })

    } catch (error) {
       console.log(error.message);
        res.json({
            ErrorMsg: error.message
        }) 
    }
} 

// get all orders for seller only : /api/order/seller
export const getAllOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find({
            $or : [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})

        res.json({
            success: true,
            orders
        })

    } catch (error) {
       console.log(error.message);
        res.json({
            ErrorMsg: error.message
        }) 
    }
} 