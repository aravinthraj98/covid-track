import { Schema } from 'mongoose';
const adminSchema = new Schema({
  areacode: {
    type: String,
    required: true,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

export default adminSchema;
