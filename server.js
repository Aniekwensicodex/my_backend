import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import path from "path"
import { errorHandler } from "./middlewares/error-handler.js";
import connectDB from "./config/db.js";
import user_router from "./routes/user_routes.js";
import superAdmin_router from "./routes/superAdmin_routes.js";
import item_router from "./routes/item_routes.js";
import buyer_router from "./routes/buyer_routes.js";


const app = express()

// const __dirname = path.resolve()

dotenv.config({ path: "./config/config.env" });
connectDB().then()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use("/api/users", user_router)
app.use("/api/superAdmin", superAdmin_router)
app.use("/api/items", item_router)
app.use("/api/buyer", buyer_router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server starting at PORT ${PORT}`)
})