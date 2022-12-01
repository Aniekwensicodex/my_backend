import express from "express";
import { create_item, get_items, get_paginated_items, get_single_items, update_items } from "../controllers/itemController.js";
import { userProtect } from "../middlewares/auth-handler.js";

const item_router = express.Router()
item_router.route("/")
    .post(userProtect, create_item, )
    .get(userProtect, get_items)

item_router.get("/paginated-items", userProtect, get_paginated_items)

item_router.route("/:id")
    .get(userProtect, get_single_items)
    .patch(userProtect, update_items)



export default item_router