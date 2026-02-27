import mongoose from "mongoose";

const user_schema = {
    username:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    phone:{
        type:Number,
        trim:true
    }
}


const User = mongoose.model('users',user_schema);

export default User;