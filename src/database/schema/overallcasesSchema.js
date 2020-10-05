import { array } from 'joi';
import { Schema } from 'mongoose';
const overallSchema = new Schema({
  email:{
      type:String,
      required:true

  },
  coordinates:{
      type:Array,
      required:true
  }
});
export default overallSchema;