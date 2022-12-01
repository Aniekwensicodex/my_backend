import express from "express"
import { user_signup, user_signin, get_all_users, get_single_user, update_single_user, delete_single_user } from "../controllers/userController.js"
import { userProtect } from "../middlewares/auth-handler.js"


const user_router = express.Router()

user_router.route("/")
    .post(user_signup)
    .get(get_all_users)
user_router.post("/signin", user_signin)

user_router.route("/:id")
    .get(userProtect, get_single_user)
    .patch(userProtect, update_single_user)
    .delete(userProtect, delete_single_user)
export default user_router