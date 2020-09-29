import { string } from 'joi';
import { Schema } from 'mongoose';

const virustest = new Schema({
    name:{
        type:String,
        required:true
    },

    address:{
        type:JSON,
        required:true
    },
    email:{
        type:String,
        required:true

    }
});

export default virustest;