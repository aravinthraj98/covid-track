import {Schema} from "mongoose";
 const UserSchema = new Schema({
    email:{
        type:String,
        min:6,
        max:144,
        unique: true,
        required:true
    },
    password:{
        type:String,
        min:6,
        
        required:true

    },
    phonenumber:{
      type:Number,
      unique: true,
      min:10,
      max:10
      
    }
});
export default UserSchema;
