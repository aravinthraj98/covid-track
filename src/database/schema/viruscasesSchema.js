import { Schema } from 'mongoose';
const Viruscases = new Schema({
    name:{
        type:String,
        required:true,
        default:"*******"
    },
    email:{
        type:String,
        required:true,
        default:""

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