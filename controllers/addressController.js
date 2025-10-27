import { addressModel } from "../models/AddressModel.js"

// add the addresses: api/address/add
export const addAddress = async(req, res)=>{
    try {
        const {userId, address} = req.body

        await addressModel.create({...address, userId})

        res.json({
            success: true,
            message: "Address Added"
        }) 

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message
        })
    }
}

// get the all addresses: /api/address/get
export const getAddress = async(req, res)=>{
    try {
        const {userId} = req.body

        const addresses = await addressModel.find({userId})

        res.json({
            success: true,
            addresses
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message
        })
    }
}