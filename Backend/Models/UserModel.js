import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
}, { timestamps })

const UserModel = mongoose.model('User_Docs', UserSchema)
export default UserModel