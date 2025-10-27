import { userModel } from "../models/UserModel.js"

// update user cart data = /api/cart/update
export const updateCart = async (req, res)=>{
    try {
        const {userId, cartItem} = req.body
        await userModel.findByIdAndUpdate(userId, {cartItem})
        res.json({
            message: "Cart Updated"
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message
        })
    }
}