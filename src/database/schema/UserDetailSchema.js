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
  familymembers: {
    type: Array,
    required: true,
  },
  dailyreport: {
    type: Array,
    required: true,
  },
});
export default UserDetailSchema;
