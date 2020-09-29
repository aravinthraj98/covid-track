import mongoose from 'mongoose';
import virusSchema from "../schema/virustestSchema";

const virustest = new mongoose("virustest",virusSchema);
export default virustest;

