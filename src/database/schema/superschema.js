import { Schema } from 'mongoose';

const superSchema = new Schema({
    adminid:{
        type:String,
        required:true
    },
    password:{
       type:String,
       required:true
    }
});

export default superSchema;
