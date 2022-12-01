import asyncHandler from "express-async-handler";
import Item from "../models/item.js";
import User from "../models/user.js";



export const create_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const { itemName, price, size, typeOfItem, qty, description } = req.body
    if (user) {
        const item = await Item.create({
            created_by: req.user.id,
            itemName,
            price,
            size,
            typeOfItem,
            qty,
            availablity: true,
            description
        })
        if (item) {
            res.json({
                satus: "Ok",
                message: "Item created successfully",
                data: item
            })
        } else {
            res.json({
                error: "Invalid data inputed"

            })

        }
    } else {
        res.status(400).json({
            error: "User does not exist"
        })
    }
})

export const get_paginated_items = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const count = await Item.countDocuments({ created_by: user._id })
    const items = await Item.find({ created_by: user._id })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    if (user && items) {
        res(201).json({
            status: "Ok",
            message: "Paginated items retrieved",
            data: {
                items,
                meta: {
                    page,
                    pages: Math.ceil(count / pageSize),
                    total: count,
                },
            }
        })
    } else {
        res.json({
            error: "User does not exist or does not have items"
        })
    }
})

export const get_items = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const items = await Item.find({ created_by: user._id })
        // Assignment
        // const items = await Item.findOne({created_by: user._id, id:req.params.id})
    if (user && items) {
        res.json({
            status: "Ok",
            message: "All items retrieved",
            data: items
        })

    } else {
        res.json({
            error: "User does nor exist or no items for user"
        })

    }

})

export const get_single_items = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const items = await Item.findOne({ created_by: user._id, _id: req.params.id })

    if (items) {
        res.json({
            status: "Ok",
            message: "Single item gotten successfully",
            data: items
        })
    } else {
        res.json({
            error: "Item not available"

        })
    }
})

export const update_items = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const items = await Item.findOne({ created_by: user._id })
    const {
        itemName,
        price,
        size,
        typeOfItem,
        qty,
        description
    } = req.body

    if (user && items) {

        items.itemName = itemName || items.itemName
        items.price = price || items.price
        items.size = size || items.size
        items.typeOfItem = typeOfItem || items.typeOfItem
        items.qty = qty || items.qty
        items.description = description || items.description

        const updatedItem = await items.save()

        if (updatedItem) {
            res.status(201).json({
                status: "Ok",
                message: "Item updated successfully",
                data: updatedItem
            })

        } else {
            res.json({ message: "Something went wrong" })
        }

    } else {
        res.json({ error: "Item does not exist" })
    }

})


//  FOR BUYER