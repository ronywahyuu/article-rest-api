import mongoose from "mongoose";
const {Schema} = mongoose
const UserSchema = new mongoose.Schema({
    _id : Schema.Types.ObjectId,
    username: String,
    email: String,
    password : String,
})

export default mongoose.model('User', UserSchema)