import mongoose from 'mongoose';
import virusSchema from "../schema/virustestSchema";

const virustest =  mongoose.model("virustest",virusSchema);
export default virustest;

