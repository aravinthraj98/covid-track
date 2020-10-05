import { number } from 'joi';
import { Schema } from 'mongoose';
const Viruscases = new Schema({
   
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
       

    },
    street: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true
    },
    address: {
        type: JSON,
        required: true
    }

});
export default Viruscases;