import { Schema } from 'mongoose';

const UserDetailSchema = new Schema({
  email: {
    type: String,
    min: 6,
    max: 144,
    unique: true,
    required: true,
  },
  address: {
    type: JSON,
    required: true,
  },
  noofmembers: {
    type: Number,
    required: true  
  },
  familymembers: {
    type: Array,
    required: true,
  },
  dailyreport: {
    type: Array,
  },
  location:{
    type:Array,
  },
  phonenumber:{
    type:Number,
    min:10
  }
});
export default UserDetailSchema;
