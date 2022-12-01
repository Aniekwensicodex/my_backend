import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    gender: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    address: { type: String },
    password: { type: String }
})

const User = mongoose.model("User", userSchema)
export default User