import jwt from 'jsonwebtoken'

// it verify the user is authenticated or not?
export const authUser = async (req, res, next)=>{
    const {token} = req.cookies;
    // its for checking the availability of token
    if(!token){
        res.json({
            success: false,
            message: "You're not Authorized User"
        })
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY);

        if(tokenDecoded){
            req.user = {id: tokenDecoded.Id}
        }else{
            res.json({
            success: false,
            message: "You're not Authorized User"
        })}

        next();

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}