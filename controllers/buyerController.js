import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../utilities/generate_token.js";
import Buyer from "../models/buyer.js";
import User from "../models/user.js";
import Item from "../models/item.js";
import { token } from "morgan";
import { userProtect } from "../middlewares/auth-handler.js";


export const buyer_signup = asyncHandler(async(req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        age,
        address,
        password,
        phoneNumber,
        gender,
        email
    } = req.body
    console.log(req.body)
    const buyerExist = await Buyer.find({ $or: [{ email: email }, { phoneNumber: phoneNumber }] })
    if (buyerExist.length > 0) {
        res.json({ error: "Buyer already exists" })
    } else {
        const hashedPass = await bcrypt.hash(password, 10)

        const buyer = await Buyer.create({
            firstName,
            lastName,
            middleName,
            phoneNumber,
            age,
            password: hashedPass,
            email,
            gender,
            address
        })
        if (buyer) {
            res.status(201).json({
                status: "Ok",
                message: "Buyer created successfully",
                data: {
                    id_: buyer._id,
                    firstName: buyer.firstName,
                    middleName: buyer.middleName,
                    lastName: buyer.lastName,
                    age: buyer.age,
                    email: buyer.email,
                    address: buyer.address,
                    gender: buyer.gender,
                    password: buyer.password,
                    phoneNumber: buyer.phoneNumber,
                    token: generateToken(buyer._id)

                }




            })



        } else {
            res.status(400).json({
                message: "Buyer not valid"
            })
        }
    }

})

export const buyer_signin = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const buyer = await Buyer.findOne({ email })
    if (!Buyer || !bcrypt.compareSync(password, buyer.password)) {
        res.json({ error: "Email or password is incorrect" })
    } else {
        res.json({

            status: "Ok",
            message: "Login successful",
            data: {
                _id: buyer._id,
                firstName: buyer.firstName,
                middleName: buyer.middleName,
                lastName: buyer.lastName,
                age: buyer.age,
                email: buyer.email,
                address: buyer.address,
                gender: buyer.gender,
                password: buyer.password,
                phoneNumber: buyer.phoneNumber,
                token: generateToken(buyer._id)
            }


        })

    }


})

export const get_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findOne({ _id: req.params.id })
    if (buyer) {
        res.json({
            status: "Ok",
            message: "Buyer gotten",
            data: buyer
        })

    } else {
        res.json({ message: "Buyer does not exist" })
    }


})

export const update_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findById(req.params.id)
    const {
        firstName,
        middleName,
        lastName,
        age,
        address,
        phoneNumber,
        gender,
        email
    } = req.body
    if (buyer) {
        buyer.firstName = firstName || buyer.firstName
        buyer.middleName = middleName || buyer.middleName
        buyer.lastName = lastName || buyer.lastName
        buyer.addressName = address || buyer.address
        buyer.email = email || buyer.email
        buyer.age = age || buyer.age
        buyer.phoneNumber = phoneNumber || buyer.phoneNumber

        const updatedBuyer = await buyer.save()

        if (updatedBuyer) {
            res.json({
                status: "Ok",
                message: "Buyer updated successfully",
                data: updatedBuyer

            })

        } else {
            res.json({ message: "Something went wrong" })
        }

    } else {
        res.json({ error: "Buyer does not exist" })
    }


})

export const delete_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findByIdAndDelete(req.params.id)

    if (buyer) {
        res.json({
            status: "Ok",
            message: "Buyer deleted successfully"
        })
    } else {
        res.json({
            message: "Buyer not found"
        })
    }
})


/////////////////////////////////////////////////////////

export const buyer_get_items = asyncHandler(async(req, res) => {
    const user = await User.find({})
    const items = await Item.find({ created_by: user })
    const available_item = items.map(a => a.availability == true)

    if (available_item) {
        res.json({
            status: "Ok",
            message: "all items gotten successfully",
            data: items
        })


    } else {
        res.json({
            error: "There is no item available"
        })
    }

})