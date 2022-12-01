import mongoose from "mongoose";

const superAdminSchema = mongoose.Schema({
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    gender: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    address: { type: String },
    password: { type: String },
    superadmin: {
        type: Boolean,
        default: false
    }
})

const super_Admin = mongoose.model("superAdmin", superAdminSchema)
export default super_Admin