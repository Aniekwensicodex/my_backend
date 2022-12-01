import express from "express"
import { superAdmin_signup, superAdmin_signin } from "../controllers/superAdminController.js"
import { superProtect } from "../middlewares/superAdmin-handler.js"





const superAdmin_router = express.Router()

superAdmin_router.route("/")
    .post(superAdmin_signup)


superAdmin_router.post("/signin", superAdmin_signin)


export default superAdmin_router