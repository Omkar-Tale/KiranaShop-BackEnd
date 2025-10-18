import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
    const  { sellerToken } = req.cookies;
    if(!sellerToken){
        res.json({
            success: false,
            message: "You're not Authorized!"
        })
    } 

    try {
        const tokenDecoded = jwt.verify(sellerToken, process.env.SECRET_KEY);
        if(tokenDecoded){
            req.user = {id: tokenDecoded.Id}
        }else{
            res.json({
                success: false,
                message: "You're not Authorized!"
            })
        }
        next()
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}