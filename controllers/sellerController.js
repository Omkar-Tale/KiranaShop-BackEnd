import jwt from "jsonwebtoken";


export const sellerLogin = async (req, res)=>{

    try {
        const { email, password} = req.body;
        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: "7d"});
            res.cookie("sellerToken", token, {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                secure: process.env.NODE_ENV === "production"
            })
            return res.json({
            success: true,
            user: "Seller logged in successfully!"
        })
        }

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const isSellerAuth = async(req, res)=>{
    try {
        return res.json({success: true})
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const sellerLogout = async (req, res)=>{
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production"
        })
        res.json({
            success: true,
            message: "Seller Logged out successfully!"
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}