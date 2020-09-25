import { Schema } from 'mongoose';
const UserSchema = new Schema({
  email: {
    type: String,
    min: 6,
    max: 144,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
  },
  password_changedon:{
    type:Date,
  }

});
export default UserSchema;
