import mongoose, {model, models}from "mongoose";

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique:true,
        lowercase: true,
        trim:true,
    },
    password:{
        type:String,
    },
    profilePicture:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps: true});

const UserModel = models.UserModel || model('UserModel', userSchema)
export default UserModel;