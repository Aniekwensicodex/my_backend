import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../utilities/generate_token.js";
import super_Admin from "../models/superAdmin.js";
import User from "../models/user.js";
import Buyer from "../models/buyer.js";
import { token } from "morgan";


export const superAdmin_signup = asyncHandler(async(req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        age,
        address,
        password,
        phoneNumber,
        gender,
        email,
        superadmin
    } = req.body
    console.log(req.body)
    const superExist = await super_Admin.find({})

    const aExist = await super_Admin.find({ email: email }, { phoneNumber: phoneNumber })
    if (superExist.length == 0 && aExist.length == 0) {
        const hashedPass = await bcrypt.hash(password, 10)

        const superAdmin = await super_Admin.create({
            firstName,
            middleName,
            lastName,
            age,
            address,
            password: hashedPass,
            phoneNumber,
            gender,
            email,
            superadmin: true
        })
        if (superAdmin) {
            res.status(201).json({
                status: "Ok",
                message: "You are now the Super Admin",
                data: {
                    id_: superAdmin._id,
                    firstName: superAdmin.firstName,
                    middleName: superAdmin.middleName,
                    lastName: superAdmin.lastName,
                    age: superAdmin.age,
                    email: superAdmin.email,
                    address: superAdmin.address,
                    gender: superAdmin.gender,
                    password: superAdmin.password,
                    phoneNumber: superAdmin.phoneNumber,
                    token: generateToken(superAdmin._id)

                }


            })
        } else {
            res.status(400).json({
                message: "Super Admin data not valid"
            })
        }
    } else if (aExist.length > 0) {
        throw new Error("Admin already exist")

    } else {

        const hashedPass = await bcrypt.hash(password, 10)
        const admin = await super_Admin.create({
            firstName,
            middleName,
            lastName,
            age,
            address,
            password: hashedPass,
            phoneNumber,
            gender,
            email,
        })
        if (admin) {
            res.json({
                status: "OK",
                message: "You are now an Admin",
                data: {
                    _id: admin._id,
                    firstname: admin.firstname,
                    middlename: admin.middlename,
                    lastname: admin.lastname,
                    dob: admin.dob,
                    qualification: admin.qualification,
                    post: admin.post,
                    email: admin.email,
                    phonenumber: admin.phonenumber,
                    password: admin.password,
                    gender: admin.gender,
                    address: admin.address,
                    superadmin: admin.superadmin,
                    token: generateToken(admin._id)
                }
            })

        } else {
            res.json({
                message: "Incorrect Information"
            })

        }

    }

})




export const superAdmin_signin = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const superAdmin = await super_Admin.findOne({ email })
    if (!superAdmin || !bcrypt.compareSync(password, superAdmin.password)) {
        res.json({ error: "Email or password is incorrect" })
    } else {
        res.json({
            status: "OK",
            message: "Super admin Logged in successfully",
            data: {
                _id: superAdmin._id,
                firstName: superAdmin.firstName,
                middleName: superAdmin.middleName,
                lastName: superAdmin.lastName,
                age: superAdmin.age,
                email: superAdmin.email,
                address: superAdmin.address,
                gender: superAdmin.gender,
                password: superAdmin.password,
                phoneNumber: superAdmin.phoneNumber,
                token: generateToken(superAdmin._id)
            }

        })
    }
})





//////////

//export const get_super_Admin = asyncHandler(()=>{

//})

export const adminGetBuyers = asyncHandler(async(req, res) => {
    const admin = await super_Admin.findById(req.superAdmin.id)
    if (admin.superAdmin === true) {
        const buyer = await Buyer.find({})
        const user = await User.find({})
        res.json({
            status: "Ok",
            message: "All buyers retrieved",
            data: {
                buyer,
                user,
                item

            }
        })
    } else {
        res.json({ message: "You are not a Super Admin" })
    }
})

export const get_single_buyer = asyncHandler(async(req, res) => {
    const admin = await superAdmin.findById({ _id: req.params.id })
    if (admin.superAdmin === true) {
        const singleBuyer = Buyer.find(b => b._id == req.params.id)
        res.json({
            status: "Ok",
            message: "Single buyer gotten",
            data: singleBuyer

        })
    } else {
        res.json({ message: "You are not a Super admin" })
    }

})

export const get_single_admin = asyncHandler(async(req, res) => {
    const admin = await super_Admin.findById({ _id: req.params.id })

    if (admin) {
        res.json({
            status: "OK",
            message: "Admin gotten",
            data: admin
        })

    } else {
        res.json({ message: "Profile not found" })
    }
})