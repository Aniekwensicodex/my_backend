import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import super_Admin from "../models/superAdmin.js";



const superProtect = asyncHandler(async(req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await super_Admin.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized')
        }


    }
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized')
    }
})

export { superProtect }