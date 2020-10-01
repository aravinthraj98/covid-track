import mongoose from "mongoose"
import Viruscases from "../schema/viruscasesSchema"

const viruscases = mongoose.model("viruscases",Viruscases);

export default viruscases;

