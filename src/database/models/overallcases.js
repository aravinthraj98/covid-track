import mongoose from 'mongoose';
import overallSchema from "../schema/overallcasesSchema"
const overallcases = mongoose.model("overallcases",overallSchema);
export default overallcases;