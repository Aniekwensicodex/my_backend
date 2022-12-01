import express from "express"
import { buyer_signup, buyer_signin, get_single_buyer, update_single_buyer, delete_single_buyer, buyer_get_items, } from "../controllers/buyerController.js"
import { userProtect } from "../middlewares/auth-handler.js"


const buyer_router = express.Router()

buyer_router.route("/")
    .post(buyer_signup, )
    .get(buyer_get_items)

buyer_router.post("/signin", buyer_signin)

buyer_router.route("/:id")
    .get(userProtect, get_single_buyer, )
    .patch(userProtect, update_single_buyer)
    .delete(userProtect, delete_single_buyer)
export default buyer_router