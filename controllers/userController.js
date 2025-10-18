import { userModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// register user 
// api path: /api/user/register
export const register = async (req, res) => {
    try {
        // getting value form the body
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.json({
                success: false,
                message: "Missing Details!"
            })
        }

        // it is checking for the user is already existed or not
        const existUser = await userModel.findOne({ email });

        if (existUser) {
            res.json({
                success: false,
                message: "User already exist!"
            })
        }

        // it is for making password in encrypted format
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ name, email, password: hashedPassword });

        // the token is siging here
        const token = jwt.sign({ Id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

        // the token is passing through cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        })

        res.json({
            success: true,
            user: { name: user.name, email: user.email }
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}


// login user
// login user path: api/user/login

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            res.json({
                success: false,
                message: "Invalid Email or Password!"
            })
        }

        // it used to compare the entered password and original user password is correct or not
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.json({
                success: false,
                message: "Invalid Email or Password!"
            })
        }

        const token = jwt.sign({Id: user._id}, process.env.SECRET_KEY, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        })

        res.json({
            success: true,
            user: { email: user.email, password: user.password }
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}



//  checking the user is authencated or not?
// api path : /api/user/is-auth
export const isAuth = async (req, res)=>{
    try {
        const userId = req.user.id
        const user = await userModel.findById(userId).select("-password");
        res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// logut user
// api path: api/user/logout

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        })
        res.json({
            success: true,
            user: "user logged out successfully!"
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}